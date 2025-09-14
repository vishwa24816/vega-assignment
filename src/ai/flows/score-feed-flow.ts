
'use server';
/**
 * @fileOverview A feed scoring AI agent.
 *
 * - scoreFeed - A function that scores and sorts feed posts based on user preferences.
 * - ScoreFeedInput - The input type for the scoreFeed function.
 * - ScoreFeedOutput - The return type for the scoreFeed function.
 */

import { ai } from '@/ai/genkit';
import type { Post, User } from '@/lib/definitions';
import { z } from 'genkit';

const PostSchema = z.object({
  id: z.string(),
  userId: z.string(),
  content: z.string(),
  imageUrl: z.string().optional(),
  createdAt: z.string(),
});

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  avatarUrl: z.string(),
  bio: z.string(),
  bannerUrl: z.string().optional(),
});

export const ScoreFeedInputSchema = z.object({
  user: UserSchema.describe('The user for whom the feed is being scored.'),
  posts: z
    .array(PostSchema)
    .describe('The list of posts to score and sort.'),
});
export type ScoreFeedInput = z.infer<typeof ScoreFeedInputSchema>;

const ScoredPostSchema = z.object({
  postId: z.string().describe('The ID of the post.'),
  score: z
    .number()
    .describe(
      'A score from 0 to 1 indicating the relevance of the post to the user. 1 is most relevant.'
    ),
  reasoning: z
    .string()
    .describe('A brief explanation of why the post received its score.'),
});

export const ScoreFeedOutputSchema = z.object({
  scoredPosts: z
    .array(ScoredPostSchema)
    .describe('The list of posts with their scores.'),
});
export type ScoreFeedOutput = z.infer<typeof ScoreFeedOutputSchema>;

export async function scoreFeed(
  input: ScoreFeedInput
): Promise<ScoreFeedOutput> {
  if (input.posts.length === 0) {
    return { scoredPosts: [] };
  }
  return scoreFeedFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scoreFeedPrompt',
  input: { schema: ScoreFeedInputSchema },
  output: { schema: ScoreFeedOutputSchema },
  prompt: `You are an expert at personalizing social media feeds. Your task is to score a list of posts based on their relevance to a given user.

Analyze the user's bio to understand their interests.
User Bio: "{{user.bio}}"

For each of the following posts, provide a relevance score between 0.0 and 1.0, where 1.0 is highly relevant to the user's interests. Also, provide a brief reasoning for your score.

Here are the posts to score:
{{#each posts}}
- Post ID: {{id}}
- Post Content: "{{content}}"
---
{{/each}}

Please provide the output as a structured list of scored posts.`,
});

const scoreFeedFlow = ai.defineFlow(
  {
    name: 'scoreFeedFlow',
    inputSchema: ScoreFeedInputSchema,
    outputSchema: ScoreFeedOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      // If the AI fails, return the posts in their original order with a neutral score.
      return {
        scoredPosts: input.posts.map((post) => ({
          postId: post.id,
          score: 0.5,
          reasoning: 'AI scoring failed.',
        })),
      };
    }
    return output;
  }
);

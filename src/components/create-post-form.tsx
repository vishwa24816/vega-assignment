'use client';

import { useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Image as ImageIcon, Send } from 'lucide-react';
import type { User } from '@/lib/definitions';
import { createPost } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

export function CreatePostForm({ user }: { user: User }) {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleCreatePost = async (formData: FormData) => {
    const result = await createPost(user.id, formData);
    if (result.success) {
      formRef.current?.reset();
    } else {
       toast({
        title: "Error",
        description: result.message || "Could not create post.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <form
          ref={formRef}
          action={handleCreatePost}
          className="flex items-start gap-4"
        >
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              name="content"
              placeholder="What's on your mind?"
              className="mb-2 min-h-[60px] border-0 bg-transparent px-0 focus-visible:ring-0"
              required
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2 text-muted-foreground">
                <Button variant="ghost" size="icon" type="button">
                  <ImageIcon className="h-5 w-5" />
                </Button>
              </div>
              <Button size="sm" type="submit">
                Post <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

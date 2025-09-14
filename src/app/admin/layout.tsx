import { Logo } from "@/components/logo";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-muted/40 p-4">
       <div className="absolute left-4 top-4">
          <Link href="/" className="text-sm underline">
            &larr; Back to Main Site
          </Link>
        </div>
      <div className="mb-8 mt-16">
        <Logo href="/admin/dashboard" />
      </div>
      {children}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, Clock, ArrowLeft } from "lucide-react";
import { CommentSection } from "@/components/custom/comment-section";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";

export default function BlogPostPage() {
  const router = useRouter();
  const id = useParams().slug;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const blogContent = DOMPurify.sanitize(post?.main_content || "");
  const randomInt = Math.floor(Math.random() * 5) + 1;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/posts/${id}`);

        if (res.status === 404) {
          return notFound();
        }

        if (!res.ok) {
          throw new Error("Failed to fetch post");
        }

        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <BlogPostSkeleton />;
  }

  if (!post) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-6 hover:underline"
      >
        <ArrowLeft size={16} />
        <span>Back to all posts</span>
      </Link>

      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <div className="flex gap-2 mb-4">
            {post.tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary">
                {tag.toString()}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={post.user.profile_pic}
                  alt={post.user.first_name}
                />
                <AvatarFallback>
                  {post.user.first_name?.charAt(0) || ""}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{post.user.first_name}</span>
            </div>

            <Separator orientation="vertical" className="h-4" />

            <div className="flex items-center gap-1 text-muted-foreground">
              <CalendarIcon size={16} />
              <span>{formatDate(post.created_at)}</span>
            </div>

            <Separator orientation="vertical" className="h-4" />

            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock size={16} />
              <span>{randomInt} min read</span>
            </div>
          </div>

          <div className="relative aspect-[2/1] mb-8">
            <Image
              src={
                post.featured_image || "/placeholder.svg?height=600&width=1200"
              }
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </header>

        <div
          className="prose max-w-none dark:prose-invert mb-12"
          dangerouslySetInnerHTML={{ __html: blogContent }}
        />

        <Separator className="my-12" />

        <CommentSection postSlug={post.id} comments={post.comments} />
      </article>
    </div>
  );
}

function BlogPostSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Skeleton className="h-6 w-32" />
      </div>

      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>

          <Skeleton className="h-12 w-full mb-2" />
          <Skeleton className="h-12 w-2/3 mb-4" />

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>

            <Skeleton className="h-4 w-1 mx-2" />

            <Skeleton className="h-4 w-32" />

            <Skeleton className="h-4 w-1 mx-2" />

            <Skeleton className="h-4 w-24" />
          </div>

          <div className="relative aspect-[2/1] mb-8">
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
        </header>

        <div className="space-y-4 mb-12">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
        </div>

        <Skeleton className="h-px w-full my-12" />

        <div className="space-y-6">
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-32 w-full mb-4" />
          <Skeleton className="h-10 w-32 mb-8" />

          <div className="space-y-6">
            <div className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-5 w-48 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-5 w-48 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

<<<<<<< HEAD
"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { BlogCard } from "@/components/custom/blog-card"
import { BlogCardSkeleton } from "@/components/custom/blog-card-skeleton"
import type { BlogPost } from "@/lib/types"

export default function Home() {
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const observer = useRef<IntersectionObserver | null>(null)
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoadingMore) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })

      if (node) observer.current.observe(node)
    },
    [isLoadingMore, hasMore],
  )

  // Fetch posts based on search params and pagination
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Build query params
        const sort = searchParams.get("sort") || "newest"
        const category = searchParams.get("category")
        const search = searchParams.get("search")

        let url = `/api/posts?page=1&limit=6`
        if (sort) url += `&sort=${sort}`
        if (category) url += `&category=${category}`
        if (search) url += `&search=${search}`

        const res = await fetch(url)

        if (!res.ok) {
          throw new Error("Failed to fetch posts")
        }

        const data = await res.json()
        setPosts(data.posts)
        setHasMore(data.hasMore)
        setPage(1)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [searchParams])

  // Load more posts when page changes
  useEffect(() => {
    if (page === 1) return

    const loadMorePosts = async () => {
      try {
        setIsLoadingMore(true)

        const sort = searchParams.get("sort") || "newest"
        const category = searchParams.get("category")
        const search = searchParams.get("search")

        let url = `/api/posts?page=${page}&limit=6`
        if (sort) url += `&sort=${sort}`
        if (category) url += `&category=${category}`
        if (search) url += `&search=${search}`

        const res = await fetch(url)

        if (!res.ok) {
          throw new Error("Failed to fetch more posts")
        }

        const data = await res.json()
        setPosts((prev) => [...prev, ...data.posts])
        setHasMore(data.hasMore)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoadingMore(false)
      }
    }

    loadMorePosts()
  }, [page, searchParams])

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Code & Chaos </h1>
        <p className="text-muted-foreground">Tech, Trends & Tomorrow</p>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">No posts found</h2>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => {
            if (posts.length === index + 1) {
              return (
                <div ref={lastPostElementRef} key={post.id}>
                  <BlogCard post={post} />
                </div>
              )
            } else {
              return <BlogCard key={post.id} post={post} />
            }
          })}

          {isLoadingMore && (
            <>
              <BlogCardSkeleton />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
            </>
          )}
        </div>
      )}
    </div>
  )
}

=======
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
>>>>>>> 62ed429 (Initial commit from Create Next App)

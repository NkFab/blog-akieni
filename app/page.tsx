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

        // Build query params
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
        <h1 className="text-4xl font-bold mb-2">My Blog</h1>
        <p className="text-muted-foreground">Thoughts, ideas, and everything in between</p>
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


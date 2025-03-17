import { NextResponse } from "next/server"
import type { BlogPost } from "@/lib/types"
import { mockBlogPosts } from "@/lib/mock-data"
import { toast } from "sonner"

// This function will fetch from the API with fallback to mock data
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "6")
    const sort = searchParams.get("sort") || "newest"
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    let posts: BlogPost[] = []

    try {
      // Try to fetch from external API
      const response = await fetch("https://jsonfakery.com/blogs", {
        headers: {
          Accept: "application/json",
        },
        // Add a timeout to prevent hanging requests
        signal: AbortSignal.timeout(5000),
      })

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

        posts = await response.json()
        
    } catch (apiError) {
      toast("Error", {
        description: "Failed to fetch posts. Please try again." + apiError,
      })
      // Fallback to mock data
      posts = mockBlogPosts
    }

    // Apply filters
    if (category) {
      posts = posts.filter((post) => post.tags.map((tag) => tag.name.includes(category)))
    }

    if (search) {
      const searchLower = search.toLowerCase()
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.subtitle.toLowerCase().includes(searchLower) 
          // || post.main_content.some((paragraph) => paragraph.toLowerCase().includes(searchLower)),
      )
    }

    // Apply sorting
    if (sort === "newest") {
      posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } else if (sort === "oldest") {
      posts.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPosts = posts.slice(startIndex, endIndex)
    const hasMore = endIndex < posts.length

    return NextResponse.json({
      posts: paginatedPosts,
      hasMore,
      total: posts.length,
    })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}


import { NextResponse } from "next/server"
import type { BlogPost } from "@/lib/types"
// import { mockBlogPosts } from "@/lib/mock-data"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const param = await params;
    const id = param.slug

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
      console.log(`External API error: ${apiError}. Using mock data instead.`)
      // Fallback to mock data
      // posts = mockBlogPosts
    }

    const post = posts.find((p) => p.id === id)

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}


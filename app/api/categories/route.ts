import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 700))

    // Extract unique categories from mock data
    // const categories = Array.from(new Set(mockBlogPosts.flatMap((post) => post.categories))).sort()
    const categories = [{ name: "All" }, { name: "Tech" }, { name: "Design" }, { name: "Culture" }, { name: "Business" }, { name: "Politics" }]

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}


import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { Comment } from "@/lib/types";

export async function POST(request: Request) {
  const { post_id, user_id } = await request.json();
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await request.json();

    if (!content || typeof content !== "string" || content.trim() === "") {
      return NextResponse.json(
        { error: "Comment content is required" },
        { status: 400 }
      );
    }

    // In a real app, this would save to a database
    // For demo purposes, we'll just return a mock response
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      user_id,
      post_id,
      content: content.trim(),
      user: {
        email: session.user.email || "",
        username: session.user.name || "",
        // profile_pic: session.user?.photo || "",
      },
    };

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(newComment);
  } catch (error) {
    console.error("Error posting comment:", error);
    return NextResponse.json(
      { error: "Failed to post comment" },
      { status: 500 }
    );
  }
}

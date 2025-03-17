import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { Comment } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { post_id, user_id, content } = body;

    if (!post_id || typeof post_id !== "string") {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    if (!user_id || typeof user_id !== "string") {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    if (!content || typeof content !== "string" || content.trim() === "") {
      return NextResponse.json({ error: "Comment content is required" }, { status: 400 });
    }

    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      user_id,
      post_id,
      main_content: content.trim(),
      created_at: new Date().toISOString(),
      user: {
        email: session.user.email || "",
        username: session.user.name || "",
        profile_pic: session.user?.image || "",
      },
    };

    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(newComment);
  } catch (error) {
    console.error("Error posting comment:", error);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
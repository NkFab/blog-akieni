import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MessageSquare, User } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { BlogPost } from "@/lib/types"

interface BlogCardProps {
    post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <Card className="overflow-hidden h-full flex flex-col">
            <Link href={`/blog/${post.id}`} className="relative block aspect-video overflow-hidden">
                <Image
                    src={post.featured_image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                />
            </Link>
            <CardHeader className="pb-2">
                <div className="flex gap-2 mb-2">
                    {post.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary">
                            {tag.toString()}
                        </Badge>
                    ))}
                </div>
                <Link href={`/blog/${post.id}`} className="hover:underline">
                    <h2 className="text-xl font-bold line-clamp-2">{post.title}</h2>
                </Link>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{post.summary}</p>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground border-t pt-4">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{post.user.first_name} ${post.user.last_name }</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <CalendarIcon size={14} />
                        <span>{formatDate(post.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageSquare size={14} />
                        <span>{post.comments.length} comments</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}


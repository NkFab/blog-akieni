"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, ChevronDown, Menu, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { useSession, signIn, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Logo } from "./logo"

export function Navbar() {
    const router = useRouter()
    // const pathname = usePathname()
    const searchParams = useSearchParams()
    const { data: session, status } = useSession()
    const isMobile = useMobile()

    const [searchQuery, setSearchQuery] = useState("")
    const [categories, setCategories] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const debouncedSearchQuery = useDebounce(searchQuery, 500)

    // Fetch categories on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories")
                const data = await res.json()
                setCategories(data)
            } catch (error) {
                console.error("Failed to fetch categories:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCategories()
    }, [])

    // Handle search query changes
    useEffect(() => {
        if (debouncedSearchQuery) {
            const params = new URLSearchParams(searchParams)
            params.set("search", debouncedSearchQuery)
            router.push(`/?${params.toString()}`)
        } else if (searchParams.has("search") && debouncedSearchQuery === "") {
            const params = new URLSearchParams(searchParams)
            params.delete("search")
            router.push(`/?${params.toString()}`)
        }
    }, [debouncedSearchQuery, router, searchParams])

    // Set initial search query from URL
    useEffect(() => {
        const search = searchParams.get("search")
        if (search) {
            setSearchQuery(search)
        }
    }, [searchParams])

    const handleSort = (sort: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("sort", sort)
        router.push(`/?${params.toString()}`)
    }

    const handleCategoryFilter = (category: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("category", category)
        router.push(`/?${params.toString()}`)
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-20 items-center justify-between">
                <div className="flex items-center gap-2 pl-2 lg:pl-6">
                    <Link href="/" className="font-bold text-xl">
                        <Logo classname="h-6 w-6" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    nmf...
                </div>

                {isMobile ? (
                    <>
                        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </Button>

                        {isMenuOpen && (
                            <div className="absolute top-16 left-0 right-0 bg-background border-b p-4 flex flex-col gap-4">
                                <div className="relative w-full">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search posts..."
                                        className="pl-8"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Button variant="ghost" className="justify-start" onClick={() => handleSort("newest")}>
                                        Most Recent
                                    </Button>
                                    <Button variant="ghost" className="justify-start" onClick={() => handleSort("oldest")}>
                                        Oldest
                                    </Button>

                                    <div className="py-2">
                                        <h3 className="mb-2 text-sm font-medium">Categories</h3>
                                        {isLoading ? (
                                            <div className="space-y-2">
                                                <Skeleton className="h-8 w-full" />
                                                <Skeleton className="h-8 w-full" />
                                                <Skeleton className="h-8 w-full" />
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-1">
                                                {categories.map((category) => (
                                                    <Button
                                                        key={category}
                                                        variant="ghost"
                                                        className="justify-start"
                                                        onClick={() => handleCategoryFilter(category)}
                                                    >
                                                        {category}
                                                    </Button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-2 border-t">
                                    {status === "loading" ? (
                                        <Skeleton className="h-10 w-full" />
                                    ) : session ? (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                                                    <AvatarFallback>{session.user?.name?.[0] || "U"}</AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm font-medium">{session.user?.name}</span>
                                            </div>
                                            <Button variant="ghost" size="sm" onClick={() => signOut()}>
                                                Sign out
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button onClick={() => signIn()} className="w-full">
                                            Sign in
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex items-center gap-4">
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search posts..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="gap-1">
                                    Sort
                                    <ChevronDown size={16} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleSort("newest")}>Most Recent</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSort("oldest")}>Oldest</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="gap-1">
                                    Categories
                                    <ChevronDown size={16} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="max-h-80 overflow-y-auto">
                                {isLoading ? (
                                    <div className="p-2 space-y-2">
                                        <Skeleton className="h-8 w-40" />
                                        <Skeleton className="h-8 w-40" />
                                        <Skeleton className="h-8 w-40" />
                                    </div>
                                ) : (
                                    categories.map((category) => (
                                        <DropdownMenuItem key={category} onClick={() => handleCategoryFilter(category)}>
                                            {category}
                                        </DropdownMenuItem>
                                    ))
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {status === "loading" ? (
                            <Skeleton className="h-10 w-24" />
                        ) : session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                                            <AvatarFallback>{session.user?.name?.[0] || "U"}</AvatarFallback>
                                        </Avatar>
                                        <span className="hidden md:inline">{session.user?.name}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button onClick={() => signIn()}>Sign in</Button>
                        )}
                    </div>
                )}
            </div>
        </header>
    )
}


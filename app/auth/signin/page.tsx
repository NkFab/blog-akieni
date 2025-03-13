"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Mail } from "lucide-react"

export default function SignIn() {
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState<string | null>(null)

    // Get the callbackUrl from the query parameters
    const callbackUrl = searchParams.get("callbackUrl") || "/"

    // Check if there's a redirect URL in sessionStorage
    useEffect(() => {
        const redirectAfterLogin = sessionStorage.getItem("redirectAfterLogin")
        if (redirectAfterLogin) {
            // We'll use this in the auth callback
        }
    }, [])

    const handleSignIn = async (provider: string) => {
        setIsLoading(provider)

        try {
            await signIn(provider, { callbackUrl })
        } catch (error) {
            console.error("Sign in error:", error)
        } finally {
            setIsLoading(null)
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
                    <CardDescription>Choose your preferred sign in method</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleSignIn("github")}
                        disabled={isLoading !== null}
                    >
                        {isLoading === "github" ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                Signing in...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <Github className="h-5 w-5" />
                                Sign in with GitHub
                            </span>
                        )}
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleSignIn("google")}
                        disabled={isLoading !== null}
                    >
                        {isLoading === "google" ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                Signing in...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <Mail className="h-5 w-5" />
                                Sign in with Google
                            </span>
                        )}
                    </Button>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <div className="text-sm text-muted-foreground text-center mt-2">
                        By signing in, you agree to our Terms of Service and Privacy Policy.
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}


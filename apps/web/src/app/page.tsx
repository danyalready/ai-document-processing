"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

import { ChromeIcon } from "@/shared/components/icons/ChromeIcon";
import { GithubIcon } from "@/shared/components/icons/GithubIcon";
import { login, register } from "@/lib/api";

import AuthForm from "./AuthForm";

export default function AuthPage() {
    const router = useRouter();
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isLogin = mode === "login";

    async function handleAuthSubmit(formData: {
        fullName: string;
        email: string;
        password: string;
    }) {
        try {
            setError(null);
            setIsSubmitting(true);

            if (isLogin) {
                await login(formData.email, formData.password);
                router.replace("/dashboard");
                router.refresh();
                return;
            }

            await register(
                formData.fullName,
                formData.email,
                formData.password,
            );
            setMode("login");
            setError(
                "Check your email to verify your account before signing in.",
            );
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Authentication failed",
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleGoogleAuth = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    };

    return (
        <div className="size-full flex bg-background dark h-svh">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary/20 via-background to-accent/20 p-12 flex-col justify-between relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-primary rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-xl font-mono font-medium text-foreground">
                                DocFlow AI
                            </h1>
                            <p className="text-sm font-mono text-muted-foreground">
                                Document Intelligence Platform
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8 mt-16">
                        <div>
                            <h2 className="text-3xl font-mono font-medium text-foreground mb-4">
                                Enterprise-Grade
                                <br />
                                Document Processing
                            </h2>
                            <p className="text-base font-mono text-muted-foreground leading-relaxed">
                                AI-powered OCR, extraction, and semantic search
                                for modern infrastructure teams
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-4 bg-card/50 border border-border rounded-xl backdrop-blur-sm">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-mono font-medium text-foreground mb-1">
                                        98.7% OCR Accuracy
                                    </h3>
                                    <p className="text-xs font-mono text-muted-foreground">
                                        State-of-the-art models with
                                        multi-language support
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-card/50 border border-border rounded-xl backdrop-blur-sm">
                                <div className="w-8 h-8 rounded-lg bg-chart-2/10 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-4 h-4 text-chart-2" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-mono font-medium text-foreground mb-1">
                                        Real-time Processing
                                    </h3>
                                    <p className="text-xs font-mono text-muted-foreground">
                                        GPU-accelerated pipeline with
                                        auto-scaling workers
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-card/50 border border-border rounded-xl backdrop-blur-sm">
                                <div className="w-8 h-8 rounded-lg bg-chart-3/10 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-4 h-4 text-chart-3" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-mono font-medium text-foreground mb-1">
                                        Semantic Search
                                    </h3>
                                    <p className="text-xs font-mono text-muted-foreground">
                                        Vector embeddings for intelligent
                                        document retrieval
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-8 text-xs font-mono text-muted-foreground">
                        <span>SOC 2 Type II Certified</span>
                        <span>•</span>
                        <span>GDPR Compliant</span>
                        <span>•</span>
                        <span>99.9% Uptime SLA</span>
                    </div>
                </div>
            </div>

            {/* Right Panel - Auth Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-lg font-mono font-medium text-foreground">
                                DocFlow AI
                            </h1>
                            <p className="text-xs font-mono text-muted-foreground">
                                Document Intelligence
                            </p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-mono font-medium text-foreground mb-2">
                            {isLogin ? "Welcome back" : "Create your account"}
                        </h2>
                        <p className="text-sm font-mono text-muted-foreground">
                            {isLogin
                                ? "Sign in to access your document processing workspace"
                                : "Start processing documents with AI-powered intelligence"}
                        </p>
                    </div>

                    {/* OAuth Buttons */}
                    <div className="space-y-3 mb-6">
                        <button
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-secondary border border-border rounded-xl text-sm font-mono text-foreground hover:bg-secondary/80 transition-colors"
                            onClick={handleGoogleAuth}
                        >
                            <ChromeIcon className="w-4 h-4" />
                            <span>Continue with Google</span>
                        </button>
                        <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-secondary border border-border rounded-xl text-sm font-mono text-foreground hover:bg-secondary/80 transition-colors">
                            <GithubIcon className="w-4 h-4" />
                            <span>Continue with GitHub</span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-2 bg-background text-muted-foreground font-mono">
                                or continue with email
                            </span>
                        </div>
                    </div>

                    <AuthForm
                        isLogin={isLogin}
                        handleSubmit={handleAuthSubmit}
                        error={error}
                        isSubmitting={isSubmitting}
                    />

                    {/* Toggle Mode */}
                    <div className="mt-6 text-center">
                        <span className="text-sm font-mono text-muted-foreground">
                            {isLogin
                                ? "Don't have an account?"
                                : "Already have an account?"}{" "}
                        </span>
                        <button
                            onClick={() =>
                                setMode(isLogin ? "signup" : "login")
                            }
                            className="text-sm font-mono text-primary hover:text-primary/80"
                        >
                            {isLogin ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

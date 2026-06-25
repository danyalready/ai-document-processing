"use client";

import { useState } from "react";

import { login, register } from "@/lib/api";
import { ChromeIcon } from "@/shared/components/icons/ChromeIcon";
import { GithubIcon } from "@/shared/components/icons/GithubIcon";
import { Spinner } from "@/shared/components/ui";

export default function AuthScreen() {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState<string | null>(null);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading("email");
        setTimeout(() => {
            setLoading(null);
            // onAuth();
        }, 1000);
    }

    function handleOAuth(provider: "google" | "github") {
        if (provider === "github") {
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`;
        } else if (provider === "google") {
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
        }
    }

    return (
        <div className="flex-1 flex items-center justify-center bg-white px-6">
            <div className="w-full max-w-90">
                {/* Heading */}
                <div className="mb-8 text-center">
                    <p className="text-[22px] font-semibold text-[#111111] tracking-tight">
                        {mode === "login"
                            ? "Welcome back"
                            : "Create your account"}
                    </p>
                    <p className="text-[13px] text-[#9CA3AF] mt-1.5">
                        {mode === "login"
                            ? "Sign in to continue to AiDoc"
                            : "Start analyzing documents in seconds"}
                    </p>
                </div>

                {/* OAuth buttons */}
                <div className="flex flex-col gap-2.5 mb-6">
                    <button
                        onClick={() => handleOAuth("google")}
                        disabled={!!loading}
                        className="w-full h-11 rounded-xl border border-[#E5E7EB] bg-white flex items-center justify-center gap-3 text-[14px] font-medium text-[#111111] hover:bg-[#F8F9FA] transition-colors disabled:opacity-60"
                    >
                        {loading === "google" ? <Spinner /> : <ChromeIcon />}
                        Continue with Google
                    </button>

                    <button
                        onClick={() => handleOAuth("github")}
                        disabled={!!loading}
                        className="w-full h-11 rounded-xl border border-[#E5E7EB] bg-white flex items-center justify-center gap-3 text-[14px] font-medium text-[#111111] hover:bg-[#F8F9FA] transition-colors disabled:opacity-60"
                    >
                        {loading === "github" ? <Spinner /> : <GithubIcon />}
                        Continue with GitHub
                    </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-px bg-[#F3F4F6]" />
                    <span className="text-[12px] text-[#9CA3AF]">or</span>
                    <div className="flex-1 h-px bg-[#F3F4F6]" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {mode === "signup" && (
                        <div>
                            <input
                                type="text"
                                placeholder="Full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] bg-white text-[14px] text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/20 transition-all"
                            />
                        </div>
                    )}

                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] bg-white text-[14px] text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/20 transition-all"
                    />

                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full h-11 px-4 rounded-xl border border-[#E5E7EB] bg-white text-[14px] text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/20 transition-all"
                        />
                        {mode === "login" && (
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-[#4F7CFF] hover:underline"
                            >
                                Forgot?
                            </button>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={!!loading}
                        className="w-full h-11 rounded-xl bg-[#4F7CFF] text-white text-[14px] font-medium hover:bg-[#3D6AEE] transition-colors shadow-[0_2px_8px_rgba(79,124,255,0.3)] disabled:opacity-60 flex items-center justify-center mt-1"
                    >
                        {loading === "email" ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : mode === "login" ? (
                            "Sign in"
                        ) : (
                            "Create account"
                        )}
                    </button>
                </form>

                {/* Toggle */}
                <p className="text-center text-[13px] text-[#9CA3AF] mt-6">
                    {mode === "login"
                        ? "Don't have an account? "
                        : "Already have an account? "}
                    <button
                        onClick={() =>
                            setMode(mode === "login" ? "signup" : "login")
                        }
                        className="text-[#4F7CFF] font-medium hover:underline"
                    >
                        {mode === "login" ? "Sign up" : "Sign in"}
                    </button>
                </p>

                {/* Terms — signup only */}
                {mode === "signup" && (
                    <p className="text-center text-[11px] text-[#9CA3AF] mt-4 leading-relaxed">
                        By creating an account you agree to our{" "}
                        <span className="text-[#6B7280] hover:underline cursor-pointer">
                            Terms
                        </span>{" "}
                        and{" "}
                        <span className="text-[#6B7280] hover:underline cursor-pointer">
                            Privacy Policy
                        </span>
                        .
                    </p>
                )}
            </div>
        </div>
    );
}

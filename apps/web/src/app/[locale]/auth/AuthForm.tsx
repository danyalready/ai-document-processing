"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { login, register } from "@/lib/api";

import AuthInput from "./AuthInput";

export type Mode = "signup" | "signin";

interface Props {
    mode: Mode;
    setMode: (mode: Mode) => void;
}

export default function AuthForm({ mode, setMode }: Props) {
    const t = useTranslations("Auth");
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [info, setInfo] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (value: string) => {
        setEmail(value);
        setError(null);
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        setError(null);
    };

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);

        try {
            if (mode === "signup") {
                await register(name, email, password);
                handleModeChange("signin");
                setInfo(t("messages.verifyEmail"));
            } else {
                await login(email, password);
                router.refresh();
            }
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Authentication failed",
            );

            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleModeChange = (nextMode: Mode) => {
        setError(null);
        setInfo(null);
        setMode(nextMode);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {mode === "signup" && (
                <AuthInput
                    type="text"
                    placeholder={t("fields.name.label")}
                    value={name}
                    onChange={setName}
                    required
                />
            )}

            <AuthInput
                type="email"
                placeholder={t("fields.email.label")}
                value={email}
                onChange={handleEmailChange}
                required
            />

            <div className="relative">
                <AuthInput
                    type="password"
                    placeholder={t("fields.password.label")}
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />

                {mode === "signin" && (
                    <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#4F7CFF] hover:underline"
                    >
                        {t("actions.forgotPassword")}
                    </button>
                )}
            </div>

            {info && (
                <div className="flex items-start justify-between rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-700">
                    <span>{info}</span>
                    <button
                        type="button"
                        onClick={() => setInfo(null)}
                        className="ml-2"
                    >
                        ×
                    </button>
                </div>
            )}

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="mt-1 flex h-11 w-full items-center justify-center rounded-xl bg-[#4F7CFF] text-sm font-medium text-white shadow-[0_2px_8px_rgba(79,124,255,0.3)] transition-colors hover:bg-[#3D6AEE] disabled:opacity-60"
            >
                {loading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : mode === "signin" ? (
                    t("actions.signIn")
                ) : (
                    t("actions.createAccount")
                )}
            </button>
        </form>
    );
}

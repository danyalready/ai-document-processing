"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { login, register } from "@/lib/api";

import AuthInput from "./AuthInput";

interface Props {
    mode: "signup" | "signin";
}

export default function AuthForm({ mode }: Props) {
    const t = useTranslations("Auth");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);

        try {
            if (mode === "signup") {
                await register(name, email, password);
            } else {
                await login(email, password);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

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
                onChange={setEmail}
                required
            />

            <div className="relative">
                <AuthInput
                    type="password"
                    placeholder={t("fields.password.label")}
                    value={password}
                    onChange={setPassword}
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

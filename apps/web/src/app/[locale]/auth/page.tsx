"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { OAUTH_URLS, providers } from "./oauth";
import AuthForm, { type Mode } from "./AuthForm";
import OAuthButton from "./OAuthButton";

export default function AuthScreen() {
    const t = useTranslations("Auth");

    const [mode, setMode] = useState<Mode>("signin");

    const [loading, setLoading] = useState<"google" | "github" | null>();

    function handleOAuth(provider: keyof typeof OAUTH_URLS) {
        setLoading(provider);
        window.location.assign(OAUTH_URLS[provider]);
    }

    return (
        <div className="flex-1 flex items-center justify-center bg-white px-6">
            <div className="w-full max-w-90">
                {/* Heading */}
                <div className="mb-8 text-center">
                    <p className="text-[22px] font-semibold text-[#111111] tracking-tight">
                        {t(`title.${mode}`)}
                    </p>
                    <p className="text-[13px] text-[#9CA3AF] mt-1.5">
                        {t(`subtitle.${mode}`)}
                    </p>
                </div>

                {/* OAuth buttons */}
                <div className="flex flex-col gap-2.5 mb-6">
                    {providers.map((provider) => (
                        <OAuthButton
                            key={provider.id}
                            provider={provider.id}
                            text={t(`oauth.${provider.id}`)}
                            icon={<provider.icon />}
                            loading={loading === provider.id}
                            onClick={() => handleOAuth(provider.id)}
                        />
                    ))}
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-px bg-[#F3F4F6]" />
                    <span className="text-[12px] text-[#9CA3AF]">
                        {t("divider")}
                    </span>
                    <div className="flex-1 h-px bg-[#F3F4F6]" />
                </div>

                {/* Form */}
                <AuthForm mode={mode} setMode={setMode} />

                {/* Toggle */}
                <p className="text-center text-[13px] text-[#9CA3AF] mt-6">
                    {t(`toggle.${mode}.text`)}{" "}
                    <button
                        onClick={() =>
                            setMode(mode === "signin" ? "signup" : "signin")
                        }
                        className="text-[#4F7CFF] font-medium hover:underline"
                    >
                        {t(`toggle.${mode}.action`)}
                    </button>
                </p>

                {/* Terms — signup only */}
                {mode === "signup" && (
                    <p className="text-center text-[11px] text-[#9CA3AF] mt-4 leading-relaxed">
                        {t("terms.prefix")}{" "}
                        <span className="text-[#6B7280] hover:underline cursor-pointer">
                            {t("terms.terms")}{" "}
                        </span>{" "}
                        {t("terms.and")}{" "}
                        <span className="text-[#6B7280] hover:underline cursor-pointer">
                            {t("terms.privacy")}
                        </span>
                        .
                    </p>
                )}
            </div>
        </div>
    );
}

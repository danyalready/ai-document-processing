import { ReactNode } from "react";

import { Spinner } from "@/shared/components/ui";

interface Props {
    provider: "google" | "github";
    text: string;
    icon: ReactNode;
    loading: boolean;
    onClick: () => void;
}

export default function OAuthButton({ text, icon, loading, onClick }: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={loading}
            className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-[#E5E7EB] bg-white text-sm font-medium text-[#111111] transition-colors hover:bg-[#F8F9FA] disabled:opacity-60"
        >
            {loading ? <Spinner /> : icon}
            {text}
        </button>
    );
}

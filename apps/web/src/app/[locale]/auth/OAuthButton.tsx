import { Spinner } from "@/shared/components/ui";

export default function OAuthButton() {
    return (
        <button
            onClick={() => handleOAuth("google")}
            disabled={!!loading}
            className="w-full h-11 rounded-xl border border-[#E5E7EB] bg-white flex items-center justify-center gap-3 text-[14px] font-medium text-[#111111] hover:bg-[#F8F9FA] transition-colors disabled:opacity-60"
        >
            {loading === "google" ? <Spinner /> : <ChromeIcon />}
            Continue with Google
        </button>
    );
}

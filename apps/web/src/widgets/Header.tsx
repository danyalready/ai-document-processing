import { Layers, Settings, Upload, X } from "lucide-react";
import Link from "next/link";

const screen: "upload" | "chat" | "settings" = "upload";

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 h-14 border-b border-[#F3F4F6] shrink-0">
            <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#4F7CFF] flex items-center justify-center shadow-[0_1px_4px_rgba(79,124,255,0.4)]">
                    <Layers className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[14px] font-semibold text-[#111111] tracking-tight">
                    AiDoc
                </span>
            </div>

            <div className="flex items-center gap-2">
                {screen === "chat" && (
                    <Link
                        href="/"
                        className="h-8 px-3.5 rounded-xl border border-[#E5E7EB] text-[12px] font-medium text-[#6B7280] hover:bg-[#F8F9FA] flex items-center gap-1.5 transition-colors"
                    >
                        <Upload className="w-3.5 h-3.5" /> New document
                    </Link>
                )}
                <Link
                    href={screen === "settings" ? "/" : "/settings"}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${screen === "settings" ? "bg-[#EEF2FF] text-[#4F7CFF]" : "hover:bg-[#F3F4F6] text-[#9CA3AF] hover:text-[#6B7280]"}`}
                >
                    {screen === "settings" ? (
                        <X className="w-4 h-4" />
                    ) : (
                        <Settings className="w-4 h-4" />
                    )}
                </Link>
            </div>
        </header>
    );
}

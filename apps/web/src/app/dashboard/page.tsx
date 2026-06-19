"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    AlertTriangle,
    ArrowRight,
    BarChart3,
    Brain,
    CheckCircle,
    ChevronRight,
    Clock,
    FileSearch,
    FileText,
    Search,
    Star,
    TrendingUp,
    Upload,
} from "lucide-react";

import { socket } from "@/lib/socket";
import { getDocuments, uploadDocument } from "@/lib/api";

type DocumentItem = {
    id: string;
    originalName: string;
    status: string;
    aiSummary?: string;
};

const TAG_COLORS: Record<string, string> = {
    Legal: "bg-blue-50 text-blue-700",
    "M&A": "bg-purple-50 text-purple-700",
    HR: "bg-green-50 text-green-700",
    Research: "bg-amber-50 text-amber-700",
    Compliance: "bg-red-50 text-red-700",
    Corporate: "bg-slate-100 text-slate-700",
    NDA: "bg-indigo-50 text-indigo-700",
    Governance: "bg-teal-50 text-teal-700",
};

export default function DashboardScreen() {
    const router = useRouter();

    const [query, setQuery] = useState("");
    const [documents, setDocuments] = useState<DocumentItem[]>([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const stats = [
        {
            label: "Documents",
            value: "247",
            delta: "+12 this month",
            icon: FileText,
            color: "text-[#4F7CFF]",
            bg: "bg-[#EEF2FF]",
        },
        {
            label: "AI Queries",
            value: "1,840",
            delta: "+340 this week",
            icon: Brain,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
        },
        {
            label: "Hours Saved",
            value: "93h",
            delta: "vs. manual review",
            icon: TrendingUp,
            color: "text-amber-600",
            bg: "bg-amber-50",
        },
        {
            label: "Accuracy Rate",
            value: "99.2%",
            delta: "Avg. confidence",
            icon: CheckCircle,
            color: "text-purple-600",
            bg: "bg-purple-50",
        },
    ];

    const quickActions = [
        {
            icon: Brain,
            label: "Summarize Document",
            sub: "Get a concise overview",
        },
        {
            icon: AlertTriangle,
            label: "Risk Assessment",
            sub: "Identify red flags",
        },
        {
            icon: FileSearch,
            label: "Find Key Clauses",
            sub: "Extract specific terms",
        },
        {
            icon: BarChart3,
            label: "Compare Documents",
            sub: "Side-by-side analysis",
        },
    ];

    const loadDocuments = useCallback(async () => {
        try {
            const data = await getDocuments<DocumentItem[]>();

            setDocuments(data);
            setError(null);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to load documents",
            );
            router.replace("/");
        }
    }, [router]);

    async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) return;

        try {
            setUploading(true);

            await uploadDocument(file);

            await loadDocuments();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed");
        } finally {
            setUploading(false);
        }
    }

    useEffect(() => {
        void Promise.resolve().then(loadDocuments);

        socket.on("document.updated", loadDocuments);

        return () => {
            socket.off("document.updated", loadDocuments);
        };
    }, [loadDocuments]);

    return (
        <div className="flex-1 overflow-y-auto bg-[#FAFAFA]">
            <div className="max-w-240 mx-auto px-10 py-12">
                {/* Header */}
                <div className="mb-10">
                    <p className="text-sm text-[#6B7280] mb-1">Good morning</p>
                    <h1 className="text-[2.25rem] font-semibold text-[#111111] tracking-tight leading-tight">
                        James Kim
                    </h1>
                    <p className="text-[#6B7280] mt-1 text-[15px]">
                        You have 3 documents pending review.
                    </p>
                </div>

                {/* Search */}
                <div className="relative mb-10">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search documents, ask anything..."
                        className="w-full h-14 pl-12 pr-6 rounded-2xl border border-border bg-white text-[#111111] placeholder:text-[#9CA3AF] text-[15px] shadow-[0_1px_4px_rgba(0,0,0,0.06)] focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]/30 focus:border-[#4F7CFF] transition-all"
                    />
                    <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 text-[11px] text-[#9CA3AF] bg-[#F3F4F6] px-2 py-1 rounded-md font-mono">
                        ⌘K
                    </kbd>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mb-10">
                    {stats.map((s) => (
                        <div
                            key={s.label}
                            className="bg-white rounded-2xl border border-border p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                        >
                            <div
                                className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-4`}
                            >
                                <s.icon className={`w-4.5 h-4.5 ${s.color}`} />
                            </div>
                            <p className="text-[26px] font-semibold text-[#111111] tracking-tight">
                                {s.value}
                            </p>
                            <p className="text-[13px] text-[#6B7280] mt-0.5">
                                {s.label}
                            </p>
                            <p className="text-[12px] text-[#9CA3AF] mt-1">
                                {s.delta}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Two-col: Recent + Quick Actions */}
                <div className="grid grid-cols-[1fr_340px] gap-6">
                    {/* Recent docs */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[15px] font-semibold text-[#111111]">
                                Recent documents
                            </h2>
                            <button
                                // onClick={() => setActive("library")}
                                className="text-[13px] text-[#4F7CFF] hover:underline flex items-center gap-1"
                            >
                                View all{" "}
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2">
                            {documents.map((doc) => (
                                <div
                                    key={doc.id}
                                    // onClick={() => setActive("analysis")}
                                    className="bg-white rounded-2xl border border-border px-5 py-4 flex items-center gap-4 hover:shadow-[0_2px_8px_rgba(0,0,0,0.07)] hover:border-[#4F7CFF]/20 transition-all cursor-pointer group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#F3F4F6] flex items-center justify-center shrink-0">
                                        <FileText className="w-5 h-5 text-[#6B7280]" />
                                    </div>
                                    <div className="flex-1 min-w-0 max-w-56">
                                        <p className="text-[14px] font-medium text-[#111111] truncate group-hover:text-[#4F7CFF] transition-colors">
                                            {doc.originalName}
                                        </p>
                                        <p className="text-[12px] text-[#9CA3AF] mt-0.5">
                                            PDF · 5Mb · 1 page
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0">
                                        <span
                                            className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${TAG_COLORS[doc.status] || "bg-gray-100 text-gray-600"}`}
                                        >
                                            {doc.status}
                                        </span>
                                        <span className="text-[12px] text-[#9CA3AF] flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> 2h ago
                                        </span>
                                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right col */}
                    <div className="flex flex-col gap-4">
                        {/* Upload CTA */}
                        <div>
                            <input
                                id="document-upload"
                                type="file"
                                className="hidden"
                                onChange={handleUpload}
                            />

                            <label
                                htmlFor="document-upload"
                                className="block bg-[#4F7CFF] rounded-2xl p-6 cursor-pointer hover:bg-[#3D6AEE] transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                                    <Upload className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-[15px] font-semibold text-white mb-1">
                                    Upload document
                                </p>
                                <p className="text-[13px] text-white/70 mb-4">
                                    PDF, DOCX, or TXT up to 50 MB
                                </p>
                                <div className="flex items-center gap-2 text-white text-[13px] font-medium group-hover:gap-3 transition-all">
                                    Get started{" "}
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </label>
                        </div>

                        {/* Quick actions */}
                        <div className="bg-white rounded-2xl border border-border p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                            <p className="text-[13px] font-semibold text-[#111111] mb-3">
                                AI quick actions
                            </p>
                            <div className="flex flex-col gap-1">
                                {quickActions.map((a) => (
                                    <button
                                        key={a.label}
                                        // onClick={() => setActive("chat")}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F8F9FA] transition-colors text-left group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] flex items-center justify-center shrink-0">
                                            <a.icon className="w-4 h-4 text-[#4F7CFF]" />
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-medium text-[#111111]">
                                                {a.label}
                                            </p>
                                            <p className="text-[11px] text-[#9CA3AF]">
                                                {a.sub}
                                            </p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-[#D1D5DB] ml-auto group-hover:text-[#4F7CFF] transition-colors" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

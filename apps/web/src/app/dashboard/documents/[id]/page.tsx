"use client";

import { useState } from "react";
import {
    AlertTriangle,
    Clock,
    CreditCard,
    Paperclip,
    Send,
    Shield,
    Sparkles,
} from "lucide-react";

const CHAT_MESSAGES = [
    {
        role: "user" as const,
        text: "What are the key termination clauses in this agreement?",
    },
    {
        role: "ai" as const,
        text: "The agreement contains three primary termination clauses. First, **Section 12.1** allows either party to terminate with 30 days written notice without cause. Second, **Section 12.3** permits immediate termination for material breach, defined as any violation of Sections 4 through 8. Third, **Section 12.5** includes a change-of-control clause, triggering termination rights if either party undergoes acquisition.",
        citations: ["§12.1 — p.28", "§12.3 — p.29", "§12.5 — p.31"],
    },
    {
        role: "user" as const,
        text: "Are there any non-compete provisions I should flag for my client?",
    },
    {
        role: "ai" as const,
        text: 'Yes — **Section 9.2** contains a broad non-compete provision covering a 24-month post-termination period across "all competing financial services entities globally." This is notably aggressive compared to standard practice. I recommend flagging: (1) the geographic scope lacks reasonable limitations, (2) the 24-month duration exceeds the typical 12-month industry standard, and (3) the definition of "competing" in §9.2(b) is unusually wide and could be challenged.',
        citations: ["§9.2 — p.22", "§9.2(b) — p.23"],
    },
];

const SUGGESTED_PROMPTS = [
    "Summarize liability clauses",
    "Identify payment terms",
    "Flag unusual provisions",
    "Compare to standard template",
];

export default function DocumentScreen() {
    const [activeTab, setActiveTab] = useState<
        "summary" | "insights" | "risks"
    >("summary");
    const [input, setInput] = useState("");
    const [activeDoc, setActiveDoc] = useState(0);

    const insights = [
        {
            icon: Shield,
            label: "Liability cap",
            value: "$5M aggregate",
            color: "text-[#4F7CFF]",
            bg: "bg-[#EEF2FF]",
        },
        {
            icon: Clock,
            label: "Contract term",
            value: "36 months",
            color: "text-emerald-600",
            bg: "bg-emerald-50",
        },
        {
            icon: CreditCard,
            label: "Payment terms",
            value: "Net 30, quarterly",
            color: "text-amber-600",
            bg: "bg-amber-50",
        },
        {
            icon: AlertTriangle,
            label: "Risk flags",
            value: "3 identified",
            color: "text-red-500",
            bg: "bg-red-50",
        },
    ];

    const risks = [
        {
            level: "High",
            title: "Overbroad non-compete scope",
            desc: "§9.2 restricts activity globally across all competing financial services. Likely unenforceable in certain jurisdictions.",
            page: "p.22",
        },
        {
            level: "Medium",
            title: "Unilateral modification clause",
            desc: "§6.4 permits Company to modify pricing with 14-day notice. Below the 30-day industry standard.",
            page: "p.15",
        },
        {
            level: "Low",
            title: "Ambiguous force majeure definition",
            desc: "§14.1 includes pandemic and cyberattacks but the trigger threshold is undefined.",
            page: "p.33",
        },
    ];

    const riskColor: Record<string, string> = {
        High: "bg-red-50 text-red-600",
        Medium: "bg-amber-50 text-amber-600",
        Low: "bg-blue-50 text-blue-600",
    };

    const docs = [
        { name: "Q4 2025 Investment Agreement.pdf", pages: 34, active: true },
        { name: "Merger Term Sheet.pdf", pages: 18, active: false },
    ];

    return (
        <div className="flex-1 flex overflow-hidden">
            {/* Analysis panel */}
            <div className="overflow-y-auto bg-[#FAFAFA] px-8 py-8 border-r border-border">
                <div className="max-w-160">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-[#4F7CFF]" />
                        </div>
                        <div>
                            <p className="text-[15px] font-semibold text-[#111111]">
                                AI Analysis
                            </p>
                            <p className="text-[12px] text-[#9CA3AF]">
                                Completed · 2 seconds
                            </p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 bg-[#F3F4F6] p-1 rounded-xl mb-6 w-fit">
                        {(["summary", "insights", "risks"] as const).map(
                            (t) => (
                                <button
                                    key={t}
                                    onClick={() => setActiveTab(t)}
                                    className={`px-4 py-2 rounded-lg text-[13px] font-medium capitalize transition-all ${activeTab === t ? "bg-white text-[#111111] shadow-[0_1px_3px_rgba(0,0,0,0.07)]" : "text-[#6B7280] hover:text-[#111111]"}`}
                                >
                                    {t}
                                </button>
                            ),
                        )}
                    </div>

                    {/* Insights cards */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {insights.map((ins) => (
                            <div
                                key={ins.label}
                                className="bg-white rounded-2xl border border-border p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                            >
                                <div
                                    className={`w-8 h-8 rounded-lg ${ins.bg} flex items-center justify-center mb-3`}
                                >
                                    <ins.icon
                                        className={`w-4 h-4 ${ins.color}`}
                                    />
                                </div>
                                <p className="text-[18px] font-semibold text-[#111111] tracking-tight">
                                    {ins.value}
                                </p>
                                <p className="text-[12px] text-[#9CA3AF] mt-0.5">
                                    {ins.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {activeTab === "summary" && (
                        <div className="bg-white rounded-2xl border border-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] mb-4">
                            <h3 className="text-[14px] font-semibold text-[#111111] mb-3">
                                Executive Summary
                            </h3>
                            <p className="text-[14px] text-[#374151] leading-relaxed">
                                This is a Series B investment agreement between{" "}
                                <strong>Meridian Capital Partners</strong> and{" "}
                                <strong>Novex Technologies Inc.</strong> for a
                                total commitment of <strong>$24.5M</strong>. The
                                agreement governs equity participation,
                                governance rights, and exit provisions across a
                                36-month primary term.
                            </p>
                            <p className="text-[14px] text-[#374151] leading-relaxed mt-3">
                                Key provisions include standard anti-dilution
                                protections (weighted average), pro-rata rights
                                for future rounds, and a 1x non-participating
                                liquidation preference. Board composition grants
                                investors one seat out of five.
                            </p>
                        </div>
                    )}

                    {activeTab === "risks" && (
                        <div className="flex flex-col gap-3 mb-4">
                            {risks.map((r) => (
                                <div
                                    key={r.title}
                                    className="bg-white rounded-2xl border border-border p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${riskColor[r.level]}`}
                                            >
                                                {r.level} risk
                                            </span>
                                            <span className="text-[11px] text-[#9CA3AF] font-mono">
                                                {r.page}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-[14px] font-semibold text-[#111111] mb-1">
                                        {r.title}
                                    </p>
                                    <p className="text-[13px] text-[#6B7280] leading-relaxed">
                                        {r.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "insights" && (
                        <div className="bg-white rounded-2xl border border-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] mb-4">
                            <h3 className="text-[14px] font-semibold text-[#111111] mb-4">
                                Key Excerpts
                            </h3>
                            {[
                                {
                                    label: "§4.2 — Anti-dilution",
                                    text: '"Investor shares shall be subject to broad-based weighted average anti-dilution protection in the event of a down round..."',
                                },
                                {
                                    label: "§9.2 — Non-compete",
                                    text: '"Each Founder agrees not to engage in any competing activity globally for a period of twenty-four (24) months following termination..."',
                                },
                            ].map((ex) => (
                                <div
                                    key={ex.label}
                                    className="mb-4 last:mb-0 border-l-2 border-[#4F7CFF] pl-4"
                                >
                                    <p className="text-[11px] font-semibold text-[#4F7CFF] mb-1 font-mono">
                                        {ex.label}
                                    </p>
                                    <p className="text-[13px] text-[#374151] italic leading-relaxed">
                                        {ex.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* PDF preview panel */}
            <div className="flex-1 flex flex-col bg-[#FAFAFA]">
                {/* Header */}
                <div className="px-8 py-5 bg-white border-b border-border flex items-center justify-between">
                    <div>
                        <h2 className="text-[15px] font-semibold text-[#111111]">
                            AI Chat
                        </h2>
                        <p className="text-[12px] text-[#9CA3AF]">
                            Analyzing {docs[activeDoc].name}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-[12px] text-[#6B7280]">
                            Ready
                        </span>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-6">
                    {CHAT_MESSAGES.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            {msg.role === "ai" && (
                                <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] flex items-center justify-center mr-3 mt-0.5 shrink-0">
                                    <Sparkles className="w-4 h-4 text-[#4F7CFF]" />
                                </div>
                            )}
                            <div
                                className={`max-w-145 ${msg.role === "user" ? "bg-[#4F7CFF] text-white rounded-2xl rounded-tr-sm px-5 py-3.5" : "bg-white border border-border rounded-2xl rounded-tl-sm px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"}`}
                            >
                                <p
                                    className={`text-[14px] leading-relaxed ${msg.role === "user" ? "text-white" : "text-[#111111]"}`}
                                >
                                    {msg.text
                                        .split(/\*\*(.*?)\*\*/g)
                                        .map((part, j) =>
                                            j % 2 === 1 ? (
                                                <strong key={j}>{part}</strong>
                                            ) : (
                                                part
                                            ),
                                        )}
                                </p>
                                {"citations" in msg && msg.citations && (
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {msg.citations.map((c) => (
                                            <span
                                                key={c}
                                                className="text-[11px] bg-[#EEF2FF] text-[#4F7CFF] px-2.5 py-1 rounded-full font-mono cursor-pointer hover:bg-[#4F7CFF] hover:text-white transition-colors"
                                            >
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Suggested prompts */}
                <div className="px-8 pb-3 flex gap-2 flex-wrap">
                    {SUGGESTED_PROMPTS.map((p) => (
                        <button
                            key={p}
                            onClick={() => setInput(p)}
                            className="text-[12px] px-3.5 py-1.5 rounded-full border border-border bg-white text-[#6B7280] hover:border-[#4F7CFF] hover:text-[#4F7CFF] transition-all"
                        >
                            {p}
                        </button>
                    ))}
                </div>

                {/* Input */}
                <div className="px-8 pb-8">
                    <div className="bg-white rounded-2xl border border-border shadow-[0_1px_4px_rgba(0,0,0,0.06)] flex items-center gap-3 px-5 py-4">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask anything about your documents..."
                            rows={1}
                            className="flex-1 resize-none bg-transparent text-[14px] text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none leading-relaxed"
                        />
                        <button
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${input.trim() ? "bg-[#4F7CFF] hover:bg-[#3D6AEE] shadow-[0_2px_8px_rgba(79,124,255,0.35)]" : "bg-[#F3F4F6]"}`}
                        >
                            <Send
                                className={`w-4 h-4 ${input.trim() ? "text-white" : "text-[#9CA3AF]"}`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

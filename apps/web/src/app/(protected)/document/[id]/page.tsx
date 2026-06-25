"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Send, Sparkles } from "lucide-react";

const SUGGESTED = [
    "Summarize this document",
    "What are the key clauses?",
    "Identify any risks",
    "Extract payment terms",
];

const SAMPLE_MESSAGES = [
    {
        role: "user" as const,
        text: "What are the termination clauses in this agreement?",
    },
    {
        role: "ai" as const,
        text: "The agreement includes three termination provisions. **Section 12.1** allows either party to exit with 30 days written notice. **Section 12.3** permits immediate termination for material breach. **Section 12.5** triggers termination rights on a change of control.",
        citations: ["§12.1 · p.28", "§12.3 · p.29", "§12.5 · p.31"],
    },
];

const docName = "Report.pdf";

export default function ChatScreen() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState(SAMPLE_MESSAGES);
    const [loading, setLoading] = useState(false);

    function send() {
        if (!input.trim() || loading) return;
        const text = input.trim();
        setInput("");
        setMessages((m) => [...m, { role: "user", text }]);
        setLoading(true);
        setTimeout(() => {
            setMessages((m) => [
                ...m,
                {
                    role: "ai",
                    text:
                        "I've reviewed the relevant sections of your document. Based on the content, " +
                        text.toLowerCase().replace("?", "") +
                        " appears to be addressed in Sections 4 through 9. Would you like me to go deeper on any specific part?",
                    citations: ["§4.1 · p.10"],
                },
            ]);
            setLoading(false);
        }, 1400);
    }

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
            {/* Doc header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-[#F3F4F6] shrink-0">
                <Link
                    href="/"
                    className="w-8 h-8 rounded-xl hover:bg-[#F3F4F6] flex items-center justify-center transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 text-[#6B7280]" />
                </Link>
                <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] flex items-center justify-center">
                    <FileText className="w-4 h-4 text-[#4F7CFF]" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-[#111111] truncate">
                        {docName}
                    </p>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[12px] text-[#9CA3AF]">Ready</span>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        {msg.role === "ai" && (
                            <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] flex items-center justify-center shrink-0 mt-0.5">
                                <Sparkles className="w-3.5 h-3.5 text-[#4F7CFF]" />
                            </div>
                        )}
                        <div
                            className={`max-w-130 ${
                                msg.role === "user"
                                    ? "bg-[#4F7CFF] text-white rounded-2xl rounded-tr-sm px-4 py-3"
                                    : "bg-[#F8F9FA] rounded-2xl rounded-tl-sm px-4 py-3.5"
                            }`}
                        >
                            <p
                                className={`text-[14px] leading-relaxed ${msg.role === "user" ? "text-white" : "text-[#111111]"}`}
                            >
                                {msg.text
                                    .split(/\*\*(.*?)\*\*/g)
                                    .map((p, j) =>
                                        j % 2 === 1 ? (
                                            <strong key={j}>{p}</strong>
                                        ) : (
                                            p
                                        ),
                                    )}
                            </p>
                            {"citations" in msg && msg.citations && (
                                <div className="mt-2.5 flex flex-wrap gap-1.5">
                                    {msg.citations.map((c) => (
                                        <span
                                            key={c}
                                            className="text-[11px] bg-white text-[#4F7CFF] border border-[#E0E7FF] px-2.5 py-0.5 rounded-full font-mono cursor-pointer hover:bg-[#4F7CFF] hover:text-white hover:border-[#4F7CFF] transition-colors"
                                        >
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex gap-3 justify-start">
                        <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] flex items-center justify-center shrink-0 mt-0.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#4F7CFF]" />
                        </div>
                        <div className="bg-[#F8F9FA] rounded-2xl rounded-tl-sm px-4 py-3.5 flex items-center gap-1.5">
                            {[0, 1, 2].map((d) => (
                                <div
                                    key={d}
                                    className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF] animate-bounce"
                                    style={{ animationDelay: `${d * 120}ms` }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Suggested prompts — only shown when no user messages yet */}
            {messages.filter((m) => m.role === "user").length < 2 && (
                <div className="px-6 pb-3 flex gap-2 flex-wrap">
                    {SUGGESTED.map((p) => (
                        <button
                            key={p}
                            onClick={() => setInput(p)}
                            className="text-[12px] px-3 py-1.5 rounded-full border border-[#E5E7EB] text-[#6B7280] hover:border-[#4F7CFF] hover:text-[#4F7CFF] transition-all bg-white"
                        >
                            {p}
                        </button>
                    ))}
                </div>
            )}

            {/* Input */}
            <div className="px-6 pb-6 shrink-0">
                <div className="flex items-end gap-3 bg-[#F8F9FA] rounded-2xl px-4 py-3.5 border border-[#E5E7EB] focus-within:border-[#4F7CFF]/50 focus-within:bg-white transition-all">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                send();
                            }
                        }}
                        placeholder="Ask anything about this document..."
                        rows={2}
                        className="flex-1 resize-none bg-transparent text-[14px] text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none leading-relaxed"
                    />
                    <button
                        onClick={send}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all ${input.trim() && !loading ? "bg-[#4F7CFF] hover:bg-[#3D6AEE] shadow-[0_2px_6px_rgba(79,124,255,0.4)]" : "bg-[#E5E7EB]"}`}
                    >
                        <Send
                            className={`w-3.5 h-3.5 ${input.trim() && !loading ? "text-white" : "text-[#9CA3AF]"}`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

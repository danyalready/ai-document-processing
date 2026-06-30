"use client";

import { logout } from "@/lib/api";
import { useState } from "react";

const Toggle = ({
    value,
    onChange,
}: {
    value: boolean;
    onChange: () => void;
}) => (
    <button
        onClick={onChange}
        className={`relative w-9 h-5.5 rounded-full transition-colors duration-200 ${value ? "bg-[#4F7CFF]" : "bg-[#D1D5DB]"}`}
    >
        <div
            className={`absolute top-0.75 left-0.75 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${value ? "translate-x-4.25" : "translate-x-0"}`}
        />
    </button>
);

const Row = ({
    label,
    sub,
    children,
}: {
    label: string;
    sub?: string;
    children: React.ReactNode;
}) => (
    <div className="flex items-center justify-between py-4 border-b border-[#F3F4F6] last:border-0">
        <div>
            <p className="text-[14px] font-medium text-[#111111]">{label}</p>
            {sub && <p className="text-[12px] text-[#9CA3AF] mt-0.5">{sub}</p>}
        </div>
        {children}
    </div>
);

export default function SettingsScreen() {
    const [responseStyle, setResponseStyle] = useState<"concise" | "detailed">(
        "concise",
    );
    const [citations, setCitations] = useState(true);
    const [suggestions, setSuggestions] = useState(true);

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
            <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="max-w-100 mx-auto">
                    {/* AI */}
                    <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">
                        AI
                    </p>
                    <div className="bg-[#F8F9FA] rounded-2xl px-5 mb-6">
                        <Row
                            label="Show citations"
                            sub="Reference page numbers in answers"
                        >
                            <Toggle
                                value={citations}
                                onChange={() => setCitations(!citations)}
                            />
                        </Row>
                        <Row
                            label="Suggested prompts"
                            sub="Show quick-start suggestions"
                        >
                            <Toggle
                                value={suggestions}
                                onChange={() => setSuggestions(!suggestions)}
                            />
                        </Row>
                        <Row label="Response style">
                            <div className="flex items-center bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
                                {(["concise", "detailed"] as const).map((v) => (
                                    <button
                                        key={v}
                                        onClick={() => setResponseStyle(v)}
                                        className={`px-3.5 py-1.5 text-[12px] font-medium capitalize transition-colors ${responseStyle === v ? "bg-[#4F7CFF] text-white" : "text-[#6B7280] hover:text-[#111111]"}`}
                                    >
                                        {v}
                                    </button>
                                ))}
                            </div>
                        </Row>
                    </div>

                    {/* Account */}
                    <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">
                        Account
                    </p>
                    <div className="bg-[#F8F9FA] rounded-2xl px-5 mb-6">
                        <Row label="James Kim" sub="james.kim@meridian.com">
                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#4F7CFF] to-[#7B9FFF] flex items-center justify-center text-white text-[11px] font-semibold">
                                JK
                            </div>
                        </Row>
                        <Row label="Plan" sub="Professional · $79 / month">
                            <button className="text-[12px] text-[#4F7CFF] font-medium hover:underline">
                                Manage
                            </button>
                        </Row>
                    </div>

                    {/* Danger */}
                    <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">
                        Data
                    </p>
                    <div className="bg-[#F8F9FA] rounded-2xl px-5">
                        <Row
                            label="Clear document history"
                            sub="Remove all uploaded files"
                        >
                            <button className="text-[12px] text-red-500 font-medium hover:underline">
                                Clear
                            </button>
                        </Row>
                        <Row label="Sign out">
                            <button
                                onClick={logout}
                                className="text-[12px] text-red-500 font-medium hover:underline"
                            >
                                Sign out
                            </button>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
}

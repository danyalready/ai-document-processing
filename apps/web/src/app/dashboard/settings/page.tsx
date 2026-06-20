"use client";

import { useState } from "react";
import { CreditCard, Sparkles, User, Lock, Zap, LogOut } from "lucide-react";

const Toggle = ({
    value,
    onChange,
}: {
    value: boolean;
    onChange: () => void;
}) => (
    <button
        onClick={onChange}
        className={`relative w-10 h-6 rounded-full transition-colors ${value ? "bg-[#4F7CFF]" : "bg-[#D1D5DB]"}`}
    >
        <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${value ? "translate-x-4" : "translate-x-0"}`}
        />
    </button>
);

export default function SettingsScreen() {
    const [notifications, setNotifications] = useState(true);
    const [aiSuggestions, setAiSuggestions] = useState(true);
    const [twoFactor, setTwoFactor] = useState(false);
    const [activeSection, setActiveSection] = useState("account");

    const sections = [
        { id: "account", label: "Account", icon: User },
        { id: "subscription", label: "Subscription", icon: CreditCard },
        { id: "ai", label: "AI Preferences", icon: Sparkles },
        { id: "security", label: "Security", icon: Lock },
    ];

    return (
        <div className="flex-1 flex overflow-hidden">
            {/* Settings sidebar */}
            <div className="w-55 border-r border-border bg-white shrink-0 px-4 py-6">
                <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3 px-2">
                    Settings
                </p>
                {sections.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => setActiveSection(s.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-[13px] font-medium transition-all mb-0.5 ${activeSection === s.id ? "bg-[#EEF2FF] text-[#4F7CFF]" : "text-[#374151] hover:bg-[#F8F9FA]"}`}
                    >
                        <s.icon className="w-4 h-4 shrink-0" />
                        {s.label}
                    </button>
                ))}
                <div className="mt-auto pt-6 border-t border-border">
                    <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-[13px] font-medium text-red-500 hover:bg-red-50 transition-all">
                        <LogOut className="w-4 h-4" /> Sign out
                    </button>
                </div>
            </div>

            {/* Settings content */}
            <div className="flex-1 overflow-y-auto bg-[#FAFAFA] px-10 py-10">
                <div className="max-w-140">
                    {activeSection === "account" && (
                        <>
                            <h1 className="text-[22px] font-semibold text-[#111111] mb-1">
                                Account
                            </h1>
                            <p className="text-[14px] text-[#6B7280] mb-8">
                                Manage your personal information and
                                preferences.
                            </p>

                            {/* Avatar */}
                            <div className="flex items-center gap-5 mb-8 pb-8 border-b border-border">
                                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#4F7CFF] to-[#7B9FFF] flex items-center justify-center text-white text-xl font-semibold shadow-[0_2px_12px_rgba(79,124,255,0.3)]">
                                    JK
                                </div>
                                <div>
                                    <p className="text-[15px] font-semibold text-[#111111]">
                                        James Kim
                                    </p>
                                    <p className="text-[13px] text-[#6B7280]">
                                        james.kim@meridian.com
                                    </p>
                                    <button className="text-[12px] text-[#4F7CFF] mt-1 hover:underline">
                                        Change photo
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5">
                                {[
                                    { label: "Full name", value: "James Kim" },
                                    {
                                        label: "Email address",
                                        value: "james.kim@meridian.com",
                                    },
                                    {
                                        label: "Organization",
                                        value: "Meridian Capital Partners",
                                    },
                                    { label: "Role", value: "Partner" },
                                ].map((field) => (
                                    <div key={field.label}>
                                        <label className="text-[12px] font-semibold text-[#374151] block mb-1.5">
                                            {field.label}
                                        </label>
                                        <input
                                            defaultValue={field.value}
                                            className="w-full h-10 px-4 rounded-xl border border-border bg-white text-[14px] text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]/20 focus:border-[#4F7CFF] transition-all"
                                        />
                                    </div>
                                ))}
                                <button className="h-10 px-5 bg-[#4F7CFF] text-white text-[13px] font-medium rounded-xl hover:bg-[#3D6AEE] transition-colors shadow-[0_2px_8px_rgba(79,124,255,0.25)] w-fit">
                                    Save changes
                                </button>
                            </div>
                        </>
                    )}

                    {activeSection === "subscription" && (
                        <>
                            <h1 className="text-[22px] font-semibold text-[#111111] mb-1">
                                Subscription
                            </h1>
                            <p className="text-[14px] text-[#6B7280] mb-8">
                                Manage your plan and billing details.
                            </p>

                            <div className="bg-white rounded-2xl border border-border p-6 mb-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="text-[16px] font-semibold text-[#111111]">
                                                Professional
                                            </p>
                                            <span className="text-[11px] bg-[#EEF2FF] text-[#4F7CFF] px-2.5 py-0.5 rounded-full font-semibold">
                                                Current
                                            </span>
                                        </div>
                                        <p className="text-[13px] text-[#6B7280]">
                                            $79 / month · Renews Jan 15, 2026
                                        </p>
                                    </div>
                                    <button className="text-[13px] text-[#4F7CFF] font-medium hover:underline">
                                        Manage
                                    </button>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        {
                                            label: "Documents",
                                            value: "247 / 500",
                                        },
                                        {
                                            label: "AI queries",
                                            value: "1,840 / 5,000",
                                        },
                                        {
                                            label: "Team seats",
                                            value: "3 / 10",
                                        },
                                    ].map((u) => (
                                        <div
                                            key={u.label}
                                            className="bg-[#F8F9FA] rounded-xl p-3"
                                        >
                                            <p className="text-[13px] font-semibold text-[#111111]">
                                                {u.value}
                                            </p>
                                            <p className="text-[11px] text-[#9CA3AF]">
                                                {u.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full h-11 rounded-xl border-2 border-[#4F7CFF] text-[#4F7CFF] text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-[#EEF2FF] transition-colors">
                                <Zap className="w-4 h-4" /> Upgrade to
                                Enterprise
                            </button>
                        </>
                    )}

                    {activeSection === "ai" && (
                        <>
                            <h1 className="text-[22px] font-semibold text-[#111111] mb-1">
                                AI Preferences
                            </h1>
                            <p className="text-[14px] text-[#6B7280] mb-8">
                                Customize how the AI assistant behaves.
                            </p>

                            <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                                {[
                                    {
                                        label: "AI suggestions",
                                        sub: "Show proactive insights while reviewing documents",
                                        value: aiSuggestions,
                                        toggle: () =>
                                            setAiSuggestions(!aiSuggestions),
                                    },
                                    {
                                        label: "Smart notifications",
                                        sub: "Get notified when AI detects anomalies",
                                        value: notifications,
                                        toggle: () =>
                                            setNotifications(!notifications),
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={item.label}
                                        className={`flex items-center justify-between px-6 py-5 ${i > 0 ? "border-t border-border" : ""}`}
                                    >
                                        <div>
                                            <p className="text-[14px] font-medium text-[#111111]">
                                                {item.label}
                                            </p>
                                            <p className="text-[12px] text-[#9CA3AF] mt-0.5">
                                                {item.sub}
                                            </p>
                                        </div>
                                        <Toggle
                                            value={item.value}
                                            onChange={item.toggle}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 bg-white rounded-2xl border border-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                                <label className="text-[12px] font-semibold text-[#374151] block mb-1.5">
                                    AI response style
                                </label>
                                <select className="w-full h-10 px-4 rounded-xl border border-border bg-white text-[14px] text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]/20 focus:border-[#4F7CFF] transition-all appearance-none cursor-pointer">
                                    <option>
                                        Concise — Short, direct answers
                                    </option>
                                    <option>
                                        Detailed — Thorough explanations with
                                        context
                                    </option>
                                    <option>
                                        Legal — Formal language with citations
                                    </option>
                                </select>
                            </div>
                        </>
                    )}

                    {activeSection === "security" && (
                        <>
                            <h1 className="text-[22px] font-semibold text-[#111111] mb-1">
                                Security
                            </h1>
                            <p className="text-[14px] text-[#6B7280] mb-8">
                                Protect your account and documents.
                            </p>

                            <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] mb-5">
                                <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                                    <div>
                                        <p className="text-[14px] font-medium text-[#111111]">
                                            Two-factor authentication
                                        </p>
                                        <p className="text-[12px] text-[#9CA3AF] mt-0.5">
                                            Add an extra layer of security to
                                            your account
                                        </p>
                                    </div>
                                    <Toggle
                                        value={twoFactor}
                                        onChange={() =>
                                            setTwoFactor(!twoFactor)
                                        }
                                    />
                                </div>
                                <div className="px-6 py-5">
                                    <p className="text-[14px] font-medium text-[#111111] mb-1">
                                        Password
                                    </p>
                                    <p className="text-[12px] text-[#9CA3AF] mb-3">
                                        Last changed 45 days ago
                                    </p>
                                    <button className="text-[13px] text-[#4F7CFF] font-medium hover:underline">
                                        Change password
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                                <p className="text-[14px] font-semibold text-[#111111] mb-3">
                                    Active sessions
                                </p>
                                {[
                                    {
                                        device: "MacBook Pro — Chrome",
                                        location: "New York, US",
                                        current: true,
                                    },
                                    {
                                        device: "iPhone 16 — Safari",
                                        location: "New York, US",
                                        current: false,
                                    },
                                ].map((session) => (
                                    <div
                                        key={session.device}
                                        className="flex items-center justify-between py-3 border-b border-border last:border-0"
                                    >
                                        <div>
                                            <p className="text-[13px] font-medium text-[#111111] flex items-center gap-2">
                                                {session.device}
                                                {session.current && (
                                                    <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-semibold">
                                                        Current
                                                    </span>
                                                )}
                                            </p>
                                            <p className="text-[12px] text-[#9CA3AF]">
                                                {session.location}
                                            </p>
                                        </div>
                                        {!session.current && (
                                            <button className="text-[12px] text-red-500 hover:underline">
                                                Revoke
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

"use client";

import {
    FileText,
    Filter,
    FolderOpen,
    Grid3X3,
    List,
    MoreHorizontal,
    Plus,
    Search,
} from "lucide-react";
import { useState } from "react";

const LIBRARY_DOCS = [
    {
        name: "Partnership Agreement Draft v3",
        type: "PDF",
        size: "3.2 MB",
        modified: "Today",
        tag: "Legal",
        folder: "Contracts",
    },
    {
        name: "SEC Filing Q3 2025",
        type: "PDF",
        size: "8.1 MB",
        modified: "2d ago",
        tag: "Compliance",
        folder: "Filings",
    },
    {
        name: "Board Meeting Minutes — Nov",
        type: "DOCX",
        size: "0.4 MB",
        modified: "1w ago",
        tag: "Corporate",
        folder: "Governance",
    },
    {
        name: "IP Assignment Agreement",
        type: "PDF",
        size: "1.7 MB",
        modified: "2w ago",
        tag: "Legal",
        folder: "Contracts",
    },
    {
        name: "Vendor NDA — TechCorp",
        type: "PDF",
        size: "0.9 MB",
        modified: "3w ago",
        tag: "NDA",
        folder: "Contracts",
    },
    {
        name: "Research Report: AI Regulation",
        type: "PDF",
        size: "4.3 MB",
        modified: "1mo ago",
        tag: "Research",
        folder: "Research",
    },
];

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

export default function LibraryScreen() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFolder, setActiveFolder] = useState("All");

    const folders = ["All", "Contracts", "Filings", "Governance", "Research"];

    const filtered = LIBRARY_DOCS.filter(
        (d) =>
            (activeFolder === "All" || d.folder === activeFolder) &&
            d.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <div className="flex-1 flex overflow-hidden">
            {/* Sidebar folders */}
            <div className="w-55 border-r border-border bg-white shrink-0 px-4 py-6">
                <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3 px-2">
                    Folders
                </p>
                {folders.map((f) => (
                    <button
                        key={f}
                        onClick={() => setActiveFolder(f)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-[13px] font-medium transition-all mb-0.5 ${activeFolder === f ? "bg-[#EEF2FF] text-[#4F7CFF]" : "text-[#374151] hover:bg-[#F8F9FA]"}`}
                    >
                        <FolderOpen className="w-4 h-4 shrink-0" />
                        {f}
                        <span className="ml-auto text-[11px] text-[#9CA3AF]">
                            {f === "All"
                                ? LIBRARY_DOCS.length
                                : LIBRARY_DOCS.filter((d) => d.folder === f)
                                      .length}
                        </span>
                    </button>
                ))}
            </div>

            {/* Main area */}
            <div className="flex-1 overflow-y-auto bg-[#FAFAFA] px-8 py-8">
                {/* Toolbar */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="relative flex-1 max-w-95">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search documents..."
                            className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-white text-[13px] text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]/20 focus:border-[#4F7CFF] transition-all"
                        />
                    </div>
                    <button className="h-10 px-4 rounded-xl border border-border bg-white text-[13px] text-[#374151] hover:bg-[#F8F9FA] flex items-center gap-2 transition-colors">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                    <div className="ml-auto flex items-center bg-white border border-border rounded-xl overflow-hidden">
                        <button
                            onClick={() => setViewMode("list")}
                            className={`w-9 h-9 flex items-center justify-center transition-colors ${viewMode === "list" ? "bg-[#EEF2FF] text-[#4F7CFF]" : "text-[#9CA3AF] hover:text-[#374151]"}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`w-9 h-9 flex items-center justify-center transition-colors ${viewMode === "grid" ? "bg-[#EEF2FF] text-[#4F7CFF]" : "text-[#9CA3AF] hover:text-[#374151]"}`}
                        >
                            <Grid3X3 className="w-4 h-4" />
                        </button>
                    </div>
                    <button className="h-10 px-4 rounded-xl bg-[#4F7CFF] text-white text-[13px] font-medium flex items-center gap-2 hover:bg-[#3D6AEE] transition-colors shadow-[0_2px_8px_rgba(79,124,255,0.25)]">
                        <Plus className="w-4 h-4" /> Upload
                    </button>
                </div>

                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-[#F3F4F6] flex items-center justify-center mb-4">
                            <FileText className="w-8 h-8 text-[#D1D5DB]" />
                        </div>
                        <p className="text-[15px] font-medium text-[#374151] mb-1">
                            No documents found
                        </p>
                        <p className="text-[13px] text-[#9CA3AF]">
                            Try adjusting your search or upload a new document.
                        </p>
                    </div>
                ) : viewMode === "list" ? (
                    <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                        <div className="grid grid-cols-[1fr_100px_90px_100px_44px] px-5 py-3 border-b border-border">
                            {["Name", "Type", "Tag", "Modified", ""].map(
                                (h) => (
                                    <p
                                        key={h}
                                        className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider"
                                    >
                                        {h}
                                    </p>
                                ),
                            )}
                        </div>
                        {filtered.map((doc, i) => (
                            <div
                                key={doc.name}
                                className={`grid grid-cols-[1fr_100px_90px_100px_44px] px-5 py-4 items-center hover:bg-[#FAFAFA] transition-colors cursor-pointer ${i < filtered.length - 1 ? "border-b border-border" : ""}`}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 rounded-lg bg-[#F3F4F6] flex items-center justify-center shrink-0">
                                        <FileText className="w-4 h-4 text-[#6B7280]" />
                                    </div>
                                    <span className="text-[13px] font-medium text-[#111111] truncate">
                                        {doc.name}
                                    </span>
                                </div>
                                <span className="text-[12px] text-[#9CA3AF] font-mono">
                                    {doc.type}
                                </span>
                                <span
                                    className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full w-fit ${TAG_COLORS[doc.tag] || "bg-gray-100 text-gray-600"}`}
                                >
                                    {doc.tag}
                                </span>
                                <span className="text-[12px] text-[#9CA3AF]">
                                    {doc.modified}
                                </span>
                                <button className="w-8 h-8 rounded-lg hover:bg-[#F3F4F6] flex items-center justify-center transition-colors">
                                    <MoreHorizontal className="w-4 h-4 text-[#9CA3AF]" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-4">
                        {filtered.map((doc) => (
                            <div
                                key={doc.name}
                                className="bg-white rounded-2xl border border-border p-5 hover:shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:border-[#4F7CFF]/20 transition-all cursor-pointer group"
                            >
                                <div className="w-full h-28 bg-[#F8F9FA] rounded-xl mb-4 flex items-center justify-center">
                                    <FileText className="w-8 h-8 text-[#D1D5DB] group-hover:text-[#4F7CFF] transition-colors" />
                                </div>
                                <p className="text-[13px] font-medium text-[#111111] mb-1 truncate">
                                    {doc.name}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${TAG_COLORS[doc.tag] || "bg-gray-100 text-gray-600"}`}
                                    >
                                        {doc.tag}
                                    </span>
                                    <span className="text-[11px] text-[#9CA3AF]">
                                        {doc.modified}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

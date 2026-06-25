"use client";

import { useRef, useState } from "react";
import { ChevronRight, FileText, Upload } from "lucide-react";
import Link from "next/link";

export default function HomeScreen() {
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const recent = [
        { name: "Q4 Investment Agreement.pdf", date: "2 hours ago" },
        { name: "Merger Term Sheet.pdf", date: "Yesterday" },
        { name: "Employment Contract.pdf", date: "3 days ago" },
    ];

    function handleFile(file: File) {
        setUploading(true);
        setTimeout(() => {
            setUploading(false);
            // onUpload(file.name);
        }, 1200);
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center px-6 bg-white">
            <div className="w-full max-w-120">
                {/* Drop zone */}
                <div
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setDragging(false);
                        const file = e.dataTransfer.files[0];
                        if (file) handleFile(file);
                    }}
                    onClick={() => !uploading && inputRef.current?.click()}
                    className={`relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer py-16 px-8
                        ${dragging ? "border-[#4F7CFF] bg-[#EEF2FF]" : "border-[#E5E7EB] hover:border-[#4F7CFF]/50 hover:bg-[#FAFAFA]"}
                        ${uploading ? "pointer-events-none" : ""}`}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        className="hidden"
                        onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleFile(f);
                        }}
                    />

                    {uploading ? (
                        <>
                            <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-[#4F7CFF] border-t-transparent rounded-full animate-spin" />
                            </div>
                            <p className="text-[14px] text-[#6B7280]">
                                Uploading...
                            </p>
                        </>
                    ) : (
                        <>
                            <div
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${dragging ? "bg-[#4F7CFF]" : "bg-[#F3F4F6]"}`}
                            >
                                <Upload
                                    className={`w-5 h-5 transition-colors ${dragging ? "text-white" : "text-[#6B7280]"}`}
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-[15px] font-medium text-[#111111]">
                                    Drop a file or click to browse
                                </p>
                                <p className="text-[13px] text-[#9CA3AF] mt-1">
                                    PDF, DOCX, or TXT · up to 50 MB
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Recent */}
                {recent.length > 0 && (
                    <div className="mt-8">
                        <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">
                            Recent
                        </p>
                        <div className="flex flex-col gap-1">
                            {recent.map((doc) => (
                                <Link
                                    key={doc.name}
                                    href="/document/123"
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#F8F9FA] transition-colors text-left group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#F3F4F6] flex items-center justify-center shrink-0">
                                        <FileText className="w-4 h-4 text-[#9CA3AF]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-medium text-[#111111] truncate">
                                            {doc.name}
                                        </p>
                                        <p className="text-[12px] text-[#9CA3AF]">
                                            {doc.date}
                                        </p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-[#D1D5DB] group-hover:text-[#4F7CFF] transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

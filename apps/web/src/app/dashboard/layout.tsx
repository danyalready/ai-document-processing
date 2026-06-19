"use client";

import Sidebar from "@/widgets/Sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className="flex h-screen bg-white overflow-hidden"
            style={{
                fontFamily:
                    "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
        >
            <Sidebar active="dashboard" setActive={() => {}} />
            {children}
        </div>
    );
}

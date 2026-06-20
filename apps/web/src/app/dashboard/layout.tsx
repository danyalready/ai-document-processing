"use client";

import { type PropsWithChildren } from "react";
import { usePathname } from "next/navigation";

import Sidebar, { type Screen } from "@/widgets/Sidebar";

export default function DashboardLayout({
    children,
}: Readonly<PropsWithChildren>) {
    const pathname = usePathname() as Screen;

    return (
        <div
            className="flex h-screen bg-white overflow-hidden"
            style={{
                fontFamily:
                    "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
        >
            <Sidebar active={pathname} />
            {children}
        </div>
    );
}

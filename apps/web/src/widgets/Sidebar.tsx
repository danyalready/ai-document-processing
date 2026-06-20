import Link from "next/link";
import { Layers, LayoutDashboard, Library, Settings } from "lucide-react";

export type Screen =
    | "/dashboard"
    | "/dashboard/documents"
    | "/dashboard/settings";

const NAV = [
    { id: "/dashboard" as Screen, icon: LayoutDashboard, label: "Dashboard" },
    { id: "/dashboard/documents" as Screen, icon: Library, label: "Documents" },
    { id: "/dashboard/settings" as Screen, icon: Settings, label: "Settings" },
];

export default function Sidebar({ active }: { active: Screen }) {
    return (
        <aside className="w-18 h-full bg-white border-r border-border flex flex-col items-center py-6 gap-1 shrink-0">
            {/* Logo */}
            <div className="mb-6 w-9 h-9 rounded-xl bg-[#4F7CFF] flex items-center justify-center shadow-[0_2px_8px_rgba(79,124,255,0.35)]">
                <Layers className="w-5 h-5 text-white" />
            </div>

            {/* Nav items */}
            <nav className="flex flex-col items-center gap-1 flex-1">
                {NAV.map(({ id, icon: Icon }) => (
                    <Link
                        key={id}
                        href={id}
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-150 group relative
              ${
                  active === id
                      ? "bg-[#EEF2FF] text-[#4F7CFF]"
                      : "text-[#9CA3AF] hover:text-[#111111] hover:bg-[#F8F9FA]"
              }`}
                    >
                        <Icon className="w-4.5 h-4.5" />
                    </Link>
                ))}
            </nav>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#4F7CFF] to-[#7B9FFF] flex items-center justify-center text-white text-xs font-semibold shadow-sm cursor-pointer">
                JK
            </div>
        </aside>
    );
}

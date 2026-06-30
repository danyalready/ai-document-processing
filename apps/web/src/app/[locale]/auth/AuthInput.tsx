import { cn } from "@/lib/cn";

interface Props {
    value: string;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    onChange: (value: string) => void;
}

export default function AuthInput({
    type = "text",
    placeholder,
    value,
    onChange,
    required = false,
    disabled = false,
    className,
}: Props) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            disabled={disabled}
            className={cn(
                "w-full h-11 px-4 rounded-xl border border-[#E5E7EB] bg-white text-[14px] text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/20 transition-all",
                className,
            )}
        />
    );
}

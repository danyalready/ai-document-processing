import { SVGProps } from "react";

export function ChromeIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
            <path
                d="M12 12L21.5 12A9.5 9.5 0 0 0 5.3 5.3L12 12Z"
                fill="#EA4335"
            />
            <path
                d="M12 12L7.25 20.23A9.5 9.5 0 0 0 21.5 12H12Z"
                fill="#34A853"
            />
            <path
                d="M12 12L5.3 5.3A9.5 9.5 0 0 0 7.25 20.23L12 12Z"
                fill="#FBBC05"
            />
            <circle cx="12" cy="12" r="4" fill="#4285F4" />
            <circle cx="12" cy="12" r="2" fill="white" />
        </svg>
    );
}

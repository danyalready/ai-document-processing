import { ChromeIcon } from "@/shared/components/icons/ChromeIcon";
import { GithubIcon } from "@/shared/components/icons/GithubIcon";

export const OAUTH_URLS = {
    google: `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
    github: `${process.env.NEXT_PUBLIC_API_URL}/auth/github`,
} as const;

export const providers = [
    {
        id: "google",
        title: "Continue with Google",
        icon: ChromeIcon,
    },
    {
        id: "github",
        title: "Continue with GitHub",
        icon: GithubIcon,
    },
] as const;

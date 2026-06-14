"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const token = params.get("token");

        if (token) {
            localStorage.setItem("token", token);
        }

        router.replace("/");
    }, [router]);

    return <p>Signing in...</p>;
}

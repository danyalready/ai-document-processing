import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
import { getMessages } from "next-intl/server";

import "../globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "AIDoc — AI Document Processing",
    description:
        "Upload, analyze, extract, summarize, and transform documents using AI.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const messages = await getMessages();

    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <NextIntlClientProvider messages={messages}>
                <body className="min-h-full flex flex-col">{children}</body>
            </NextIntlClientProvider>
        </html>
    );
}

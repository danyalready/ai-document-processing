"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { socket } from "@/lib/socket";
import { getDocuments, logout, uploadDocument } from "@/lib/api";

type DocumentItem = {
    id: string;
    originalName: string;
    status: string;
    aiSummary?: string;
};

export default function HomePage() {
    const router = useRouter();
    const [documents, setDocuments] = useState<DocumentItem[]>([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadDocuments = useCallback(async () => {
        try {
            const data = await getDocuments<DocumentItem[]>();

            setDocuments(data);
            setError(null);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to load documents",
            );
            router.replace("/");
        }
    }, [router]);

    async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) return;

        try {
            setUploading(true);

            await uploadDocument(file);

            await loadDocuments();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed");
        } finally {
            setUploading(false);
        }
    }

    async function handleLogout() {
        await logout();
        router.replace("/");
    }

    useEffect(() => {
        void Promise.resolve().then(loadDocuments);

        socket.on("document.updated", loadDocuments);

        return () => {
            socket.off("document.updated", loadDocuments);
        };
    }, [loadDocuments]);

    return (
        <main className="p-10 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium">Documents</h1>
                <button className="border px-4 py-2" onClick={handleLogout}>
                    Sign out
                </button>
            </div>

            <div>
                <input type="file" onChange={handleUpload} />
            </div>

            {uploading && <p>Uploading...</p>}
            {error && <p className="text-destructive">{error}</p>}

            <div className="space-y-4">
                {documents.map((doc) => (
                    <div key={doc.id} className="border p-4 rounded">
                        <p>
                            <strong>{doc.originalName}</strong>
                        </p>

                        <p>Status: {doc.status}</p>

                        {doc.aiSummary && <p>Summary: {doc.aiSummary}</p>}

                        <div>
                            <textarea />
                            <button>Send</button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

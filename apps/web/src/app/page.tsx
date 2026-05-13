"use client";

import { useEffect, useState } from "react";

import { getDocuments, uploadDocument } from "@/lib/api";

type DocumentItem = {
    id: string;
    originalName: string;
    status: string;
    aiSummary?: string;
};

export default function HomePage() {
    const [documents, setDocuments] = useState<DocumentItem[]>([]);

    const [uploading, setUploading] = useState(false);

    async function loadDocuments() {
        const data = await getDocuments();

        setDocuments(data);
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadDocuments();

        const interval = setInterval(loadDocuments, 3000);

        return () => clearInterval(interval);
    }, []);

    async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) return;

        try {
            setUploading(true);

            await uploadDocument(file);

            await loadDocuments();
        } finally {
            setUploading(false);
        }
    }

    return (
        <main className="p-10 space-y-6">
            <div>
                <input type="file" onChange={handleUpload} />
            </div>

            {uploading && <p>Uploading...</p>}

            <div className="space-y-4">
                {documents.map((doc) => (
                    <div key={doc.id} className="border p-4 rounded">
                        <p>
                            <strong>{doc.originalName}</strong>
                        </p>

                        <p>Status: {doc.status}</p>

                        {doc.aiSummary && <p>Summary: {doc.aiSummary}</p>}
                    </div>
                ))}
            </div>
        </main>
    );
}

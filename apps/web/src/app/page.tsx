"use client";

import { useEffect, useState } from "react";

import { socket } from "@/lib/socket";
import { getDocuments, login, register, uploadDocument } from "@/lib/api";

type DocumentItem = {
    id: string;
    originalName: string;
    status: string;
    aiSummary?: string;
};

export default function HomePage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    const [documents, setDocuments] = useState<DocumentItem[]>([]);

    const [uploading, setUploading] = useState(false);

    async function loadDocuments() {
        const data = await getDocuments();

        setDocuments(data);
    }

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

    async function handleLogin() {
        const response = await login(email, password);

        localStorage.setItem("token", response.token);

        setAuthenticated(true);

        await loadDocuments();
    }

    async function handleRegister() {
        const response = await register(email, password);

        localStorage.setItem("token", response.token);

        setAuthenticated(true);

        await loadDocuments();
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadDocuments();

        socket.on("document.updated", () => loadDocuments());

        return () => {
            socket.off("document.updated");
        };
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setAuthenticated(true);

            loadDocuments();
        }
    }, []);

    if (!authenticated) {
        return (
            <main className="p-10 space-y-4">
                <input
                    className="border p-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="border p-2"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="space-x-4">
                    <button className="border px-4 py-2" onClick={handleLogin}>
                        Login
                    </button>

                    <button
                        className="border px-4 py-2"
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                </div>
            </main>
        );
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

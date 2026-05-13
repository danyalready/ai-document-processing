const API_URL = "http://localhost:3001";

export async function uploadDocument(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(`${API_URL}/documents/upload`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Upload failed");
    }

    return response.json();
}

export async function getDocuments() {
    const response = await fetch(`${API_URL}/documents`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch documents");
    }

    return response.json();
}

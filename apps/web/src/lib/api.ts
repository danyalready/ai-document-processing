const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "/api").replace(/\/$/, "");

function getToken() {
    return localStorage.getItem("token");
}

export async function register(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (!response.ok) {
        throw new Error("Registration failed");
    }

    return response.json();
}

export async function login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    return response.json();
}

export async function uploadDocument(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(`${API_URL}/documents/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Upload failed");
    }

    return response.json();
}

export async function getDocuments() {
    const response = await fetch(`${API_URL}/documents`, {
        headers: { Authorization: `Bearer ${getToken()}` },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch documents");
    }

    return response.json();
}

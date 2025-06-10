import type { Note } from "./Body"

export const fetchNotes = async (accessToken: String): Promise<Note[]> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) throw new Error('Failed to fetch notes');
    return res.json();
}

export const addNote = async (note: string, accessToken: String): Promise<Note> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ note }),
    });
    if (!res.ok) throw new Error('Failed to fetch notes');
    return res.json();
}

export const deleteNote = async (id: number, accessToken: string): Promise<void> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    if (!res.ok) throw new Error('Failed to delte notes');
    return res.json();
}

export const registerUser = async (username: string, password: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
    });
    if (!res.ok) throw new Error('Failed register new account!');
    return res.json();
}

export const loginUser = async (username: string, password: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
    });
    if (!res.ok) throw new Error('Failed login!');
    return res.json();
}
import type { Note } from "./Body";
import { authFetch } from "./AuthFetch";

export const fetchNotes = async (accessCookie: string, refreshCookie: string): Promise<Note[]> => {
    const res = await authFetch(`${import.meta.env.VITE_API_URL}/notes`, {
        method: 'GET',
    }, accessCookie, refreshCookie);

    if (!res.ok) throw new Error('Failed to fetch notes');
    return res.json();
};

export const addNote = async (
    note: string, accessCookie: string, refreshCookie: string
): Promise<Note> => {
    const res = await authFetch(`${import.meta.env.VITE_API_URL}/notes`, {
        method: 'POST',
        body: JSON.stringify({ note }),
    }, accessCookie, refreshCookie);

    if (!res.ok) throw new Error('Failed to fetch notes');
    return res.json();
}

export const deleteNote = async (
    id: number, accessCookie: string, refreshCookie: string
): Promise<void> => {
    const res = await authFetch(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
        method: 'DELETE',
    }, accessCookie, refreshCookie);

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

export const logoutUser = async (refreshCookie: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: refreshCookie }),
    });

    if (res.status === 204) {
        console.log("Refresh token removed successfully!");
        return;
    }

    if (!res.ok) throw new Error('Refresh token already removed or refresh token not stored!');
}
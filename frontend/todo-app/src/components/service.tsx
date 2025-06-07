import type { Note } from "./Body"

export const fetchNotes = async (): Promise<Note[]> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/notes`);
    if (!res.ok) throw new Error('Failed to fetch notes');
    return res.json();
}

export const addNote = async (note: string): Promise<Note> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
    });
    if (!res.ok) throw new Error('Failed to fetch notes');
    return res.json();
}

export const deleteNote = async (id: number): Promise<void> => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
        method: "DELETE"
    });
    if (!res.ok) throw new Error('Failed to delte notes');
    return res.json();
}
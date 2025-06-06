import { useState } from 'react';
import { Add } from '@mui/icons-material';
import type { Note } from './Body';

type Props = {
  onAdd: (newNote: Note) => void;
};

export function AddNoteInput({ onAdd }: Props) {
    const [note, setNote] = useState<string>("");

    const handleAddNote = async () => {
        if (!note.trim()) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ note }),
            })

            const newNote: Note = await response.json();
            onAdd(newNote);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex items-center py-2 px-5 mb-1">
                <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text" placeholder="Type Note" aria-label="Note Input Field"
                    value={note} onChange={(e) => setNote(e.target.value)}
                />
                <button
                    className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white p-2 rounded-full"
                    type="button" onClick={handleAddNote}
                >
                    <Add />
                </button>
            </div>
        </form>
    );
}
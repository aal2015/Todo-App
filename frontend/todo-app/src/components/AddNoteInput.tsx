import { useState } from 'react';
import { Add } from '@mui/icons-material';
import type { Note } from './Body';
import { addNote } from './service';

type Props = {
    onAdd: (newNote: Note) => void,
    accessCookie: string
};

export function AddNoteInput({ onAdd, accessCookie }: Props) {
    const [note, setNote] = useState<string>("");    

    const handleAddNote = async () => {
        if (!note.trim()) return;
        await addNote(note, accessCookie)
            .then(addedNote => {
                onAdd(addedNote);
                setNote("");
            })
            .catch(err => console.error(err));
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
                    className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white p-2 rounded-full cursor-pointer"
                    type="button" onClick={handleAddNote}
                >
                    <Add />
                </button>
            </div>
        </form>
    );
}
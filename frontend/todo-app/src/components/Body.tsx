import { useState, useEffect } from 'react';
import { AddNoteInput } from "./AddNoteInput";
import { DisplayNotes } from "./DisplayNotes";
import { fetchNotes } from './service';

export type Note = {
    id: number;
    content: string;
    is_complete: boolean;
};

export function Body() {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        fetchNotes()
            .then(data => setNotes(data))
            .catch(err => console.error(err))
    }, []);

    const addNewNoteToList = (newNote: Note) => {
        setNotes(prev => [...prev, newNote]);
    };

    const removeNoteFromList = (id: number) => {
        setNotes(prev => prev.filter(note => note.id !== id));
    }

    return (<div className="bg-white rounded-b-sm h-96 flex flex-col">
        <AddNoteInput onAdd={addNewNoteToList} />
        <DisplayNotes notes={notes} onRemoveNote={removeNoteFromList} />
    </ div>);
}
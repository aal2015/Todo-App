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

    return (<div className="bg-white rounded-b-sm">
        <AddNoteInput onAdd={addNewNoteToList} />
        <DisplayNotes notes={notes} />
    </ div>);
}
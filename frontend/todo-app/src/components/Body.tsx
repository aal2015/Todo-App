import { useState, useEffect } from 'react';
import { AddNoteInput } from "./AddNoteInput";
import { DisplayNotes } from "./DisplayNotes";
import { fetchNotes } from './service';
import Cookies from "js-cookie";

export type Note = {
    id: number;
    content: string;
    is_complete: boolean;
};

export function Body(
    { accessCookie, onSetAccessCookie }:
        { accessCookie: string, onSetAccessCookie: (nullValue: null) => void }
) {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        fetchNotes(accessCookie)
            .then(data => setNotes(data))
            .catch(err => {
                console.error(err);
                onSetAccessCookie(null);
                Cookies.remove('access_token');
            });
    }, []);

    const addNewNoteToList = (newNote: Note) => {
        setNotes(prev => [...prev, newNote]);
    };

    const removeNoteFromList = (id: number) => {
        setNotes(prev => prev.filter(note => note.id !== id));
    }

    return (<div className="bg-white rounded-b-sm h-96 flex flex-col">
        <AddNoteInput onAdd={addNewNoteToList} accessCookie={accessCookie} />
        <DisplayNotes
            notes={notes} onRemoveNote={removeNoteFromList} accessCookie={accessCookie}
        />
    </ div>);
}
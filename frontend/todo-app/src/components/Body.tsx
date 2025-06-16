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
    { authCookies, onSetAccessCookie }: {
        authCookies: { accessCookie: string, refreshCookie: string }
        onSetAccessCookie: (nullValue: null) => void
    }
) {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        fetchNotes(authCookies.accessCookie, authCookies.refreshCookie)
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
        <AddNoteInput onAdd={addNewNoteToList} authCookies={authCookies} />
        <DisplayNotes
            notes={notes} onRemoveNote={removeNoteFromList} authCookies={authCookies}
        />
    </ div>);
}
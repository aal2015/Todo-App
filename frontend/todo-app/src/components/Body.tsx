import { useState, useEffect } from 'react';
import { AddNoteInput } from "./AddNoteInput";
import { DisplayNotes } from "./DisplayNotes";

const dummyNotes: string[] = ["Buy eggs", "Buy milk", "Hit the gym", "Read Prediction Machines"];

export type Note = {
    id: number;
    content: string;
    is_complete: boolean;
};

export function Body() {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/notes`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setNotes(data);
            });
    }, []);

    const addNewNoteToList = (newNote: Note) => {
        setNotes(prev => [...prev, newNote]);
    };

    return (<div className="bg-white rounded-b-sm">
        <AddNoteInput onAdd={addNewNoteToList} />
        <DisplayNotes notes={notes} />
    </ div>);
}
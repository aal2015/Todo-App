import { AddNoteInput } from "./AddNoteInput";
import { DisplayNotes } from "./DisplayNotes";

const dummyNotes : string[] = ["Buy eggs", "Buy milk", "Hit the gym", "Read Prediction Machines"];

export function Body() {
    return (<div className="bg-white rounded-b-sm">
        <AddNoteInput />
        <DisplayNotes notes={dummyNotes} />
    </ div>);
}
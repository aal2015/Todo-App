import DeleteIcon from '@mui/icons-material/Delete';
import type { Note } from './Body';
import { deleteNote } from './service';


export function DisplayNotes({ notes, onRemoveNote }: { notes: Note[], onRemoveNote: (id: number) => void }) {
    const handleDeleteNote = async (id: number) => {
        try {
            await deleteNote(id);
            onRemoveNote(id);
        } catch (err) {
            console.error(err);
        }
    };

    return (<div>
        {notes.map((note) => (
            <div key={note.id} className='flex justify-between items-center border-t border-gray-300 py-4 px-6'>
                <p className='text-xl'>{note.content}</p>
                <button onClick={() => handleDeleteNote(note.id)} aria-label='Delete Note'>
                    <DeleteIcon />
                </button>
            </div>
        ))}
    </ div>);
}
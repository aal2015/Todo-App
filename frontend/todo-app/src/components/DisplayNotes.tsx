import DeleteIcon from '@mui/icons-material/Delete';
import type { Note } from './Body';

export function DisplayNotes({ notes }: { notes: Note[] }) {
    return (<div>
        {notes.map((note) => (
            <div key={note.id} className='flex justify-between items-center border-t border-gray-300 py-4 px-6'>
                <p className='text-xl'>{note.content}</p>
                <DeleteIcon />
            </div>
        ))}
    </ div>);
}
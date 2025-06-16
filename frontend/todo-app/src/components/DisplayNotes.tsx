import DeleteIcon from '@mui/icons-material/Delete';
import type { Note } from './Body';
import { deleteNote } from './service';


export function DisplayNotes(
    { notes, onRemoveNote, authCookies }: 
    { notes: Note[], onRemoveNote: (id: number) => void, authCookies: { accessCookie: string, refreshCookie: string } }
) {
    const handleDeleteNote = async (id: number) => {
        try {
            await deleteNote(id, authCookies.accessCookie, authCookies.refreshCookie);
            onRemoveNote(id);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='overflow-y-auto'>
            {notes.map((note) => (
                <div key={note.id} className='flex justify-between items-center border-t border-gray-300 py-4 px-6'>
                    <p className='text-xl'>{note.content}</p>
                    <button
                        className="text-indigo-500 hover:text-indigo-700 cursor-pointer"
                        onClick={() => handleDeleteNote(note.id)} aria-label='Delete Note'>
                        <DeleteIcon />
                    </button>
                </div>
            ))}
        </ div>
    );
}
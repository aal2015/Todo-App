import DeleteIcon from '@mui/icons-material/Delete';

export function DisplayNotes({ notes }: { notes: string[] }) {
    return (<div>
        {notes.map((note, index) => (
            <div key={index} className='flex justify-between items-center border-t border-gray-300 py-4 px-6'>
                <p className='text-xl'>{note}</p>
                <DeleteIcon />
            </div>
        ))}
    </ div>);
}
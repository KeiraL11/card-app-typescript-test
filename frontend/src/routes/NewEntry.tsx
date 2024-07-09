import {useState, useContext, ChangeEvent, MouseEvent} from 'react'
import {EntryContext} from '../utilities/globalContext'
import {Entry, EntryContextType} from '../@types/context'

interface NewEntryProps {
    darkMode: boolean;
}


const NewEntry: React.FC<NewEntryProps> = ({darkMode}) => {
    const emptyEntry: Entry = {title: "", description: "",created_at: new Date(), scheduled_at: undefined}
    const { saveEntry } = useContext(EntryContext) as EntryContextType
    const [newEntry,setNewEntry] = useState<Entry>(emptyEntry)
    const [showScheduleAt, setShowScheduleAt] = useState(false);
    const [scheduleAt, setScheduleAt] = useState<String>('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNewEntry(prevState => ({
            ...prevState,
            [name]: name === 'created_at' || name === 'scheduled_at' ? new Date(value) : value
        }));
    }

    const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        saveEntry(newEntry)
        setNewEntry(emptyEntry)
    }

    const handleToggleScheduleAt = () => {
        setShowScheduleAt(!showScheduleAt);
    }

    const handleScheduleAtChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        // setScheduleAt(e.target.value);
        setScheduleAt(e.target.value);
        setNewEntry(prevState => ({
        ...prevState,
        scheduled_at: new Date(e.target.value)
        }));
    }

    return(
        <section className={darkMode ? "flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-gray-900 p-8 rounded-md" :"flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-gray-300 p-8 rounded-md"}>
            <input className={darkMode ? "p-3 rounded-md bg-gray-700 text-white": "p-3 rounded-md"} type="text" placeholder="Title" name="title" value={newEntry.title} onChange={handleInputChange}/>
            <textarea className={darkMode ? "p-3 rounded-md bg-gray-700 text-white": "p-3 rounded-md"} placeholder="Description" name="description" value={newEntry.description} onChange={handleInputChange}/>
            <div className='flex justify-center flex-col'>
                <label className="block text-gray-700">Today's Date: </label>
                <input className={darkMode ? "p-3 rounded-md text-white bg-gray-700" : "p-3 rounded-md text-gray-900"} type="date" name="created_at" value={(new Date(newEntry.created_at)).toISOString().split('T')[0]} onChange={handleInputChange}/>
            </div>
            <button type="button" onClick={handleToggleScheduleAt} className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600">{showScheduleAt ? 'Hide Schedule At' : 'Add Schedule At'}</button>

            {showScheduleAt && (
                <div className='flex justify-center flex-col'>
                    <label className="block text-gray-700">Schedule At: </label>
                    <input className={darkMode ? "p-3 rounded-md text-white bg-gray-700" : "p-3 rounded-md text-gray-900"} type="date" name="scheduled_at"  onChange={handleInputChange} />
                </div>
            )}
            <button onClick={(e) => {handleSend(e)}} className="bg-blue-400 hover:bg-blue-600 font-semibold text-white p-3 rounded-md">Create</button>
        </section>
    )
}

export default NewEntry;
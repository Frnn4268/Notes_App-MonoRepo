import React, {useRef, useState} from 'react'
import Togglable from './Togglable'

export default function NoteForm ({addNote, handleLogout}) {
    const [newNote, setNewNote] = useState('')
    
    const togglableRef = useRef()

    const handleChange = (e) => {
        setNewNote(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const noteObject = {
            content: newNote,
            important: false,
        }

        addNote(noteObject)
        setNewNote('')
        togglableRef.current.toggleVisibility()
    }

    return (
        <Togglable buttonLabel='New note' ref={togglableRef}>
            <h3>Create a new Note</h3>
                <form onSubmit={handleSubmit}>
                    <input 
                    placeholder='Write your note content' 
                    value={newNote} 
                    onChange={handleChange} />
                    <button type="submit">save</button>  
                </form>
                <div>
                    <button onClick={handleLogout}>
                    Logout
                    </button>
                </div>
        </Togglable> 
    )
}
import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = (noteObject) => {
    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }


   const toggleImportanceOf = id => {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
  
      noteService
        .update(id, changedNote).then(returnedNote => {
          setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
        .catch(error => {
          setErrorMessage(
            `Note '${note.content}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNotes(notes.filter(n => n.id !== id))
        })
    }

    const handleLogin = async (e) => {
      e.preventDefault()

      try {
        const user = await loginService.login({
          username,
          password
        })

        window.localStorage.setItem(
          'loggedNoteAppUser', JSON.stringify(user)
        )

        noteService.setToken(user.token)

        setUser(user)
        setUsername('')
        setPassword('')
      } catch(e) {
        setErrorMessage('Wrong credentials')

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      }   
    }

    const handleLogout = () => {
      setUser(null)
      noteService.setToken(user.token)
      window.localStorage.removeItem('loggedNoteAppUser')
    }

    const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)
      
  return (
    <div>
      <h1>Notes app</h1>

      <Notification message={errorMessage} />

      {
        user 
        ? <NoteForm
          addNote={addNote}
          handleLogout={handleLogout}
        />

        : <LoginForm  
            username={username}
            password={password}
            handleUsernameChange={
              ({target}) => setUsername(target.value)
            }
            handlePasswordChange={
              ({target}) => setPassword(target.value)
            }
            handleSubmit={handleLogin}
            addNote={addNote}
          />
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div> 
      <ul>
        <ul>
          {notesToShow.map(note => 
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )}
        </ul>
      </ul>
      <Footer />
    </div>
  )
}

export default App
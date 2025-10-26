import { useState, useEffect } from 'react'
import axios from 'axios'
import phonenumService from './services/phonenum'

const App = () => {

  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])

  useEffect(() => {
    phonenumService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [addedmessage, setAddedMessage] = useState(null)

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      name: newName,
      number: newNumber,
    }

    const nameTrimmed = newName.trim().toLowerCase()
    const exists = persons.some(p => p.name.toLowerCase().trim() === nameTrimmed)

    if (exists) {
      const existingId = persons.find(p => p.name.toLowerCase().trim() === nameTrimmed).id

      window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)
        ? phonenumService
          .update(noteObject, existingId)
          .then(newNum => {
            setPersons(persons.map(p => p.id !== existingId ? p : newNum))
            setFilteredPersons(filteredPersons.map(p => p.id !== existingId ? p : newNum))

            setAddedMessage({ message: `Updated ${newName}`, type: 'added' })
            setTimeout(() => {
              setAddedMessage(null)
            }, 5000)
          })
          .catch(error => {
            setAddedMessage({
              message: `Information of ${newName} has already been removed from server`,
              type: 'error'
            })

            setTimeout(() => {
              setAddedMessage(null)
            }, 5000)
          })

        : null
    } else {
      phonenumService
        .create(noteObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setFilteredPersons(filteredPersons.concat(returnedPerson))

          setAddedMessage({message: `Added ${returnedPerson.name}`, type: 'added' })
          setTimeout(() => {
            setAddedMessage(null)
          }, 5000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
    setFilteredPersons(persons)

    const searchTrimmed = event.target.value.trim().toLowerCase()
    const filtered = persons.filter(person => person.name.toLowerCase().includes(searchTrimmed))
    setFilteredPersons(filtered)
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id) //name of person we are deleting

    window.confirm(`Delete ${person.name} ?`)
      ? phonenumService
        .remove(id)
        .then(() => {
          const updatedPersons = persons.filter(person => person.id !== id)
          setPersons(updatedPersons)
          setFilteredPersons(updatedPersons)
        })
      : null
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedmessage} />

      <Search searchName={searchName} handleSearchChange={handleSearchChange} />

      <h2>Add a new</h2>
      <Form addNote={addNote} handleNoteChange={handleNoteChange}
        handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />

      <h2>Numbers</h2>
      <PhoneBook persons={filteredPersons} onClick={handleDelete} />
    </div>
  )
}

const Search = ({ searchName, handleSearchChange }) => {
  return (
    <div>
      filter shown with <input value={searchName} onChange={handleSearchChange} />
    </div>
  )
}

const Form = ({ addNote, handleNoteChange, handleNumberChange, newName, newNumber }) => {
  return (
    <>
      <form onSubmit={addNote}>
        <div>
          name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const PhoneBook = ({ persons, onClick }) => {
  return (
    <>
      <div>
        {persons.map(person =>
          <p key={person.id}>
            {person.name} {person.number} <button onClick={() => onClick(person.id)}>delete</button>
          </p>
        )}
      </div>
    </>
  )
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.type === 'error' ? 'error' : 'added'}>
      {message.message}
    </div>
  )
}

export default App
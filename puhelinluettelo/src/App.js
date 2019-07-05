import React, { useState, useEffect } from 'react'
import personService from './services/persons'

import Form from './components/Form'
import AllPersons from './components/AllPersons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ error, setError] = useState(null)

  useEffect(() => {
    personService
      .getAll().then(initialPersons => setPersons(initialPersons))
  }, [])



  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(event => event.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService.create(personObject)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
        setError(`Added ${personObject.name}`)
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.del(person.id)
      .then(response => {
          setPersons(persons.filter(p => p.id !== person.id))
          setError(`Deleted ${person.name}`)
      setTimeout(() => {
          setError(null)
      }, 5000)
      })
    }
  }


  return (
    <div>
      <Notification error={error} />
      <h2>Phonebook</h2>
      
      <Form
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

        <AllPersons persons={persons} deletePerson = {deletePerson} />
      
    </div>
  )

}

export default App
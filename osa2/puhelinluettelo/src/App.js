import { useEffect, useState } from 'react'
import './index.css'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(people =>
        setPersons(people)
      )
    
  }, [])

  const handlePersonsChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const personObject = {name: newName, number: newNumber}
    const existingPerson = persons.find(p => p.name === personObject.name)

    if (existingPerson) {
      if (window.confirm(newName + " already in phonebook, update?")) {
        personService
          .update(existingPerson.id, personObject).then( posted => {
            const i = persons.indexOf(existingPerson)
            const newPersons = [...persons]
            newPersons[i] = posted
            setPersons(newPersons)
            setMessage(`Updated ${personObject.name}`)
            setTimeout(() => {
              setMessage('')
            }, 5000)
          })
          .catch(error => {
            setMessage(error.response.data.error)
            setError(true)
            setTimeout(() => {
              setMessage('')
              setError(false)
            }, 5000)
          })
      }
    } else {
      personService.create(personObject).then( posted => {
        setPersons(persons.concat(posted))
        setMessage(`Added ${personObject.name}`)
        setTimeout(() => {
          setMessage('')
        }, 5000)
      })
      .catch( error => {
        setMessage(error.response.data.error)
        setError(true)
        setTimeout(() => {
          setMessage('')
          setError(false)
        }, 5000)
      })
    }
  }

  const handleDelete = (person) => {
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      personService
        .deleteObject(person.id).then( () => {
          setPersons(persons.filter(n => n.id !== person.id))
          setMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setMessage('')
          }, 5000)
        })
        .catch(error => {
          setMessage(`The person ${person.name} was already deleted from the server.`)
          setError(true)
          setTimeout(() => {
            setMessage('')
            setError(false)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>
      <PersonsForm handleSubmit={handleSubmit} handlePersonsChange={handlePersonsChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={handleDelete} filter={newFilter} />
    </div>
  )

}

export default App
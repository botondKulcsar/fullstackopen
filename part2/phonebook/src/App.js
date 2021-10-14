import React, { useState, useEffect } from "react";

import personService from "./services/persons"

const Notification = ({ name }) => {
  const notificationStyle = {
    borderStyle: "solid",
    borderColor: "green",
    color: "green",
    borderRadius: 5,
    padding: 5,
    background: "lightgrey",
    marginBottom: 10
  }

  return (
    <div style={notificationStyle}>
      Added {name}
    </div>
  )
}

const Error = ({ name }) => {
  const errorStyle = {
    borderStyle: "solid",
    borderColor: "red",
    color: "red",
    borderRadius: 5,
    padding: 5,
    background: "lightgrey",
    marginBottom: 10
  }

  return (
    <div style={errorStyle}>
      Information of { name } has already been removed from server
    </div>
  )
}

const Filter = ({ value, onChange }) => (
  <div>filter shown with
    <input
      value={value}
      onChange={onChange}
    />
  </div>
)

const PersonForm = (props) => {
  const { handleSubmit, newName, handleNameChange, newNumber, handleNumberChange } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input
          value={newName}
          onChange={handleNameChange} />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const PersonDetail = ({ name, number, remove }) => (
  <>
    <p>{name} {number} <button onClick={remove}>delete</button></p>
  </>
)

const Persons = (props) => {
  const { persons, filter, visible, remove } = props;
  const personList = persons.map(person => <PersonDetail key={person.name} name={person.name} number={person.number} remove={() => remove(person.id)} />);

  return (
    <>
      {filter ? visible : personList}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [showNotification, setShowNotification] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(personList => {
        setPersons(personList)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const alreadyAdded = persons.find(person => person.name === newName);
    if (alreadyAdded) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const updatedPerson = { ...alreadyAdded, number: newNumber }
        personService
          .update(alreadyAdded.id, updatedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p));
            setShowNotification(updatedPerson.name);
            setTimeout(() => setShowNotification(false), 5000)
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            setError(newName)
            setNewName('');
            setNewNumber('');
            setTimeout(() => setError(null), 5000)
            setPersons(persons.filter(p => p.id !== alreadyAdded.id))
          })

      }
      return;
    }
    const newPerson = { name: newName, number: newNumber };

    personService
      .create(newPerson)
      .then(savedPerson => {
        setPersons(persons.concat(savedPerson));
        setShowNotification(savedPerson.name);
        setTimeout(() => setShowNotification(false), 5000)
        setNewName('');
        setNewNumber('');
      })

  }

  const remove = (id) => {
    const personToRemove = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${personToRemove.name}?`)) {

      personService
        .remove(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }

  }


  const [visible, setVisible] = useState([]);

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase()
    setFilter(searchTerm);

    const filteredList = persons
      .filter(person => person.name.toLowerCase().includes(searchTerm))
      .map(person => <PersonDetail key={person.name} name={person.name} number={person.number} />);

    setVisible(filteredList);
  }

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      {showNotification && <Notification name={showNotification} />}
      {error && <Error name={error} />}
      <Filter
        value={filter}
        onChange={handleFilter}
      />

      <h3>add a new</h3>

      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        filter={filter}
        visible={visible}
        remove={remove}
      />

    </div>
  )
}

export default App;

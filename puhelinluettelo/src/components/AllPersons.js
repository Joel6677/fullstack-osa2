import React from 'react'
import Person from './Person'

const AllPersons = ({persons, deletePerson}) => {

    const rows = () => persons.map(person =>
        <Person
          key={person.name}
          person={person}
          deletePerson={deletePerson}
        />
      )

    return (

        rows()

    )
  }

export default AllPersons
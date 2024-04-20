import Person from "./Person"

const Persons = (props) => { 
  return (
    <div>
      {props.persons.map(p => <Person key={p.name} name={p.name} number={p.number} deleteP={() => props.handleDelete(p)} />)}
    </div>
  )
}

export default Persons
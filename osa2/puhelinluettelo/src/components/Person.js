const Person = (props) => {
  return (
    <div>
      <span key={props.id}>{props.name} {props.number}</span><button onClick={props.deleteP}>delete</button>
    </div>
  )
}

export default Person
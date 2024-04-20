import Country from "./Country"

const Countries = (props) => {

  if (props.countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  if (props.countries.length === 1) {
    return (
      <Country country={props.countries[0]} />
    )
  }

  return (
    <div>
      {props.countries.map(c => (
        <div key={c["cca2"]} >
          {console.log(c)}
          {c["name"]["common"]}
          <button onClick={() => props.onClick(c)}>show</button>
        </div>
      ))}
    </div>
  )
}

export default Countries
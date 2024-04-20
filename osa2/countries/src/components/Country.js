import Weather from "./Weather"

const Country = ({country}) => {
  return (
    <div>
      <div>
        <h1>{country["name"]["common"]}</h1>
      </div>
      <div>
        <div>capital {country["capital"]}</div>
        <div>area {country["area"]}</div>
      </div>
      <div>
        <h3>languages:</h3>
        <ul>
          {Object.values(country["languages"]).map(l => <li key={l} >{l}</li>)}
        </ul>
      </div>
      <img style={{height: "6rem"}}src={country["flags"]["svg"]} alt="flag" />
      <Weather country={country}/>
    </div>
  )
}

export default Country
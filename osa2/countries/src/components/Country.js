import axios from "axios"
import { useEffect, useState } from "react"

const Country = ({country}) => {

  const [weather, setWeather] = useState(null)
  const coords = country["latlng"]
  const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coords[0]}&lon=${coords[1]}&exclude=minutely,hourly,daily,alerts&appid=${process.env.REACT_APP_WEATHER_API_KEY}`

  console.log(country)
  
  useEffect(() => {
    const request = axios.get(weatherUrl)
    request.then(res => res.data).then(w => setWeather(w))
  }, [])

  return (
    <div>
      <div>
        <h2>{country["name"]["common"]}</h2>
      </div>
      <div>
        <div>capital {country["capital"]}</div>
        <div>area {country["area"]}</div>
      </div>
      <div>
        <h4>languages:</h4>
        <ul>
          {Object.values(country["languages"]).map(l => <li key={l} >{l}</li>)}
        </ul>
      </div>
      <img style={{height: "6rem"}}src={country["flags"]["svg"]} alt="flag" />
      <div>
        weather would be shown here
      </div>
    </div>
  )
}

export default Country
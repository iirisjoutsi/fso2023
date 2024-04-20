import axios from "axios"
import { useEffect, useState } from "react"

const Weather = ({country}) => {

  const [weather, setWeather] = useState({})
  const coords = country["latlng"]
  const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coords[0]}&lon=${coords[1]}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${process.env.REACT_APP_API_KEY}`

  useEffect(() => {
    const request = axios.get(weatherUrl)
    request.then(res => res.data).then(w => setWeather(w))
  }, [])

  useEffect(() => {
    console.log(weather)
  }, [weather]);

  if (!weather.current) {
    return (
      <div>No weather data</div>
    )
  }

  return ( 
    <div>
      <h2>Weather in {country["capital"]}</h2>
      <div>temperature {weather.current.temp} Celsius</div>
      <img src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} />
      <div>wind {weather.current.wind_speed} m/s</div>
    </div>
  );
}
 
export default Weather;
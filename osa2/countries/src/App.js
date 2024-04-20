import { useEffect, useState } from 'react'
import axios from "axios";
import Countries from './components/Countries';

const App = () => {
  
  const [countries, setCountries] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [countriesToShow, setCountriesToShow] = useState(null)
  
  const countriesUrl = "https://restcountries.com/v3.1/all"
  
  const getCountries = () => {
    const request = axios.get(countriesUrl)
    return request.then(response => response.data)
  }

  useEffect(() => {
    getCountries()
      .then(c => 
        setCountries(c))
  }, [])

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  
    const filteredCountries = countries.length > 0 ? countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];
    setCountriesToShow(filteredCountries);
  };

  const onClick = (country) => {
    setCountriesToShow([country])
  }

  return (
    <div>
      find countries
      <input value={searchTerm} onChange={handleSearch}/>
      <div>
        {countriesToShow &&
          <Countries countries={countriesToShow} onClick={onClick} />
        }
      </div>
    </div>
  );
}

export default App;

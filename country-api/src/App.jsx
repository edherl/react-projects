import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState("");
  const [continents, setContinents] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        const uniqueContinents = [
          ...new Set(data.map((country) => country.region)),
        ];
        setContinents(uniqueContinents);
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(search.toLowerCase()) &&
      (continent === "" || country.region === continent)
  );

  return (
    <main>
      <div>
        Filter by Name:
        <input
          type="text"
          placeholder="Choice your country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        Filter by Region:
        <select
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
        >
          <option>All Continents</option>
          {continents.map((continent) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.name}>
            <img src={country.flag} alt={country.name} />
            <h2>{country.name}</h2>
            <p>
              <b>🙋🏻‍♂️ Population:</b> {country.population}
            </p>
            <p>
              <b>📋 Capital:</b> {country.capital}
            </p>
            <p>
              <b>📍 Continent:</b> {country.region}
            </p>
            <p>
              <b>⌛ Timezone:</b> {country.timezones}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;

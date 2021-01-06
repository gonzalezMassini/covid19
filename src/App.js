import styles from './App.module.css';
import { fetchData, fetchCountriesData } from './api';
import { useEffect, useState } from 'react';
import { Cards, Chart, CountrySelector } from './components';

function App() {
  const [data, setData] = useState({});
  const [country, setCountry] = useState('Global');
  const [countryData, setCountryData] = useState([]);
  const getData = async () => {
    const data = await fetchData();
    setData(data);
  };
  const handleChangeCountry = async (country) => {
    const countryData = await fetchCountriesData(country);
    setCountry(country);
    const data =
      country !== 'Global'
        ? [countryData.confirmed, countryData.deaths, countryData.recovered]
        : '';
    setCountryData(data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={styles.container}>
      <a href='https://gonzalezmassini.com'>
        <h1>COVID-19 DASHBOARD</h1>
      </a>
      <Cards
        country={country}
        countryData={country !== 'Global' ? countryData : []}
        totalConfirmed={
          data.hasOwnProperty('confirmed') ? data.confirmed.value : 0
        }
        totalRecovered={
          data.hasOwnProperty('recovered') ? data.recovered.value : 0
        }
        totalDeaths={data.hasOwnProperty('deaths') ? data.deaths.value : 0}
        lastUpdate={data.hasOwnProperty('lastUpdate') ? data.lastUpdate : ''}
      />
      <CountrySelector handleChangeCountry={handleChangeCountry} />
      <Chart
        country={country}
        countryData={country !== 'Global' ? countryData : []}
      />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { fetchCountries } from '../../api';
import styles from './CountrySelector.module.css';

const CountrySelector = ({ handleChangeCountry }) => {
  const [countries, setCountries] = useState([]);
  const getCountries = async () => {
    const countriesData = await fetchCountries();
    setCountries(countriesData);
  };
  useEffect(() => {
    getCountries();
  }, []);
  return (
    <div className={styles.container}>
      <select
        className={styles.selector}
        onChange={(e) => handleChangeCountry(e.target.value)}
      >
        <option value='Global'>Global</option>
        {countries.map((country, index) => {
          return (
            <option key={index} value={country}>
              {country}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CountrySelector;

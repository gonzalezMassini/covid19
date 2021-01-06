const url = 'https://covid19.mathdro.id/api';
export const fetchData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const fetchDailySummary = async () => {
  try {
    const responseDaily = await fetch(`${url}/daily`);
    const dailyData = await responseDaily.json();
    return dailyData;
  } catch (err) {
    console.log(err);
  }
};
export const fetchCountries = async () => {
  try {
    const responseCountries = await fetch(`${url}/countries`);
    const { countries } = await responseCountries.json();
    return countries.map((country) => country.name);
  } catch (err) {
    console.log(err);
  }
};
export const fetchCountriesData = async (country) => {
  try {
    if (country !== 'Global') {
      const responseCountries = await fetch(`${url}/countries/${country}`);
      const { confirmed, deaths, recovered } = await responseCountries.json();
      const countryData = {
        confirmed: confirmed.value,
        deaths: deaths.value,
        recovered: recovered.value,
      };
      return countryData;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

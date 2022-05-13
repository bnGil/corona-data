/* This module creates the world object.
-The world object holds 5 properties (regions) that each one of them holds an array.
-Every element in that array is a country object with the corona data 
world = {
  africa:[...],
  america:[...],
  asia:[...],
  europe:[...],
  oceania:[...]
}
  */

async function fetchData(url) {
  try {
    const res = await fetch(
      "https://nameless-citadel-58066.herokuapp.com/" + url
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

async function fetchAllCountriesCovid() {
  const url = "https://corona-api.com/countries";
  try {
    const allCountries = await fetchData(url);
    return allCountries.data;
  } catch (e) {
    console.log(e);
  }
}

async function fetchARegionCountries(Region) {
  const url = "https://restcountries.herokuapp.com/api/v1/region/" + Region;
  try {
    const countriesOfRegion = await fetchData(url);
    return countriesOfRegion;
  } catch (e) {
    console.log(e);
  }
}

async function getRegionData(regionStr, worldData) {
  try {
    const allCountriesOfRegion = await fetchARegionCountries(regionStr);
    const arrOfCountryCodes = allCountriesOfRegion.map(
      (country) => country.cca2
    );
    return worldData.filter((countryData) =>
      arrOfCountryCodes.includes(countryData.code)
    );
  } catch (e) {
    console.log(e);
  }
}

export async function createWorldObj() {
  try {
    const worldCorona = await fetchAllCountriesCovid();
    const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
    const regionsData = await Promise.all(
      regions.map((region) => getRegionData(region, worldCorona))
    );
    return {
      africa: regionsData[0],
      americas: regionsData[1],
      asia: regionsData[2],
      europe: regionsData[3],
      africa: regionsData[4],
    };
  } catch (e) {
    console.log(e);
  }
}

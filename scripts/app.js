import { createWorldObj } from "./worldObj.js";
import { myChart, fetchDeath } from "./myChart.js";
const btns = document.querySelector(".grid-btns");
const tabs = document.querySelector(".tabs-container");
const select = document.getElementById("select");
const countryDataArr = [
  ...document.querySelector(".country-stat-numbers").children,
];
let regionsObj, worldObj;

const state = {
  selectedRegion: "africa",
  selectedTab: "confirmed",
};

async function main() {
  // [regionsObj, worldObj] = await getObjects();
  regionsObj = await createWorldObj();
  btns.addEventListener("click", regionHandler);
  tabs.addEventListener("click", tabHandler);
  select.addEventListener("change", selectHandler);
  updateChart(regionsObj[state.selectedRegion], state.selectedTab);
  updateCountrySelect(regionsObj[state.selectedRegion]);
}

main();

// async function getObjects() {
//   if (
//     localStorage.getItem("regionsDataObj") &&
//     localStorage.getItem("worldDataObj")
//   ) {
//     console.log("the objects are already in storage =)");
//     return [
//       localStorage.getItem("regionsDataObj"),
//       localStorage.getItem("worldDataObj"),
//     ];
//   } else {
//     const [regions, world] = await createWorldObj();
//     localStorage.setItem("regionsDataObj", JSON.stringify(regions));
//     localStorage.setItem("worldDataObj", JSON.stringify(world));
//     return [regions, world];
//   }
// }

function regionHandler(e) {
  if (e.target === e.currentTarget) return; // If pressed on grid and not on buttons - return.
  if (e.target.dataset.active === "true") return; // If already displayed - return
  activateBtn(e.target);
  state.selectedRegion = e.target.dataset.region;
  updateChart(regionsObj[state.selectedRegion], state.selectedTab);
  updateCountrySelect(regionsObj[state.selectedRegion]);
  countryDataArr.forEach((data) => (data.innerText = 0));
}

function activateBtn(btn) {
  const arrOfBtns = [...btn.parentElement.children];
  arrOfBtns.forEach((ele) => (ele.dataset.active = ""));
  btn.dataset.active = "true";
}

function updateChart(arrOfCountries, tab) {
  myChart.config.data.labels = arrOfCountries.map((country) => country.name);
  myChart.config.data.datasets[0].data = arrOfCountries.map(
    (country) => country.latest_data[tab]
  );
  myChart.config.data.datasets[0].label = state.selectedRegion;
  myChart.update();
}

function tabHandler(e) {
  if (e.target === e.currentTarget) return; // If pressed on grid and not on buttons - return.
  if (e.target.dataset.active === "true") return; // If already displayed - return
  activateBtn(e.target);
  state.selectedTab = e.target.dataset.tab;
  updateChart(regionsObj[state.selectedRegion], state.selectedTab);
}

function updateCountrySelect(arrOfCountries) {
  select.innerHTML = "";
  const defOptions = document.createElement("option");
  defOptions.value = "select";
  defOptions.innerText = "Select Country";
  select.appendChild(defOptions);
  arrOfCountries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.code;
    option.innerText = country.name;
    select.appendChild(option);
  });
}

function selectHandler(e) {
  const countryCode = select.options[select.selectedIndex].value;
  updateCountryData(countryCode);
}

function updateCountryData(code, arrOfCountries) {
  const selectedCountry = regionsObj.world.find(
    (country) => country.code === code
  );
  const newCases = selectedCountry.today.confirmed;
  const totalDeaths = selectedCountry.latest_data.deaths;
  const newDeaths = selectedCountry.today.deaths;
  const recovered = selectedCountry.latest_data.recovered;
  const critical = selectedCountry.latest_data.critical;
  const totalCases = totalDeaths + critical + recovered;

  const arrOfData = [
    totalCases,
    newCases,
    totalDeaths,
    newDeaths,
    recovered,
    critical,
  ];

  countryDataArr.forEach((data, idx) => (data.innerText = arrOfData[idx]));
}

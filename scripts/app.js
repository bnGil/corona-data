import { createWorldObj } from "./worldObj.js";
import { myChart, fetchDeath } from "./myChart.js";
const btns = document.querySelector(".grid-btns");
const tabs = document.querySelector(".tabs-container");
let regionsObj, worldObj;
const state = {
  selectedRegion: "africa",
  selectedTab: "confirmed",
};

async function main() {
  // [regionsObj, worldObj] = await getObjects();
  [regionsObj, worldObj] = await createWorldObj();
  console.log(regionsObj);
  btns.addEventListener("click", regionHandler);
  tabs.addEventListener("click", tabHandler);
  updateChart(regionsObj[state.selectedRegion], state.selectedTab);
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
  if (state.selectedRegion === "world") {
    updateChart(worldObj, state.selectedTab);
  } else {
    updateChart(regionsObj[state.selectedRegion], state.selectedTab);
    //add region's country to dropdown
  }
}

function activateBtn(btn) {
  const arrOfBtns = [...btn.parentElement.children];
  arrOfBtns.forEach((ele) => (ele.dataset.active = ""));
  btn.dataset.active = "true";
}

function updateChart(arrOfCountries, tab) {
  console.log(tab);
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
  if (state.selectedRegion === "world") {
    updateChart(worldObj, state.selectedTab);
  } else {
    updateChart(regionsObj[state.selectedRegion], state.selectedTab);
    //add region's country to dropdown
  }
}

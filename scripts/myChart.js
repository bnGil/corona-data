export const ctx = document.getElementById("myChart").getContext("2d");

const fetchCountries = () => {
  return Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));
};
export const fetchDeath = () => {
  return Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));
};

export const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: fetchCountries(),
    datasets: [
      {
        label: "covid-19",
        data: fetchDeath(),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.4,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

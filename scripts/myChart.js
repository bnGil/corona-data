export const ctx = document.getElementById("myChart").getContext("2d");

export const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "covid-19",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
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

import { GoogleCharts } from "google-charts";

function initChart(d) {
  GoogleCharts.load(() => drawChart(d), { packages: ["corechart"] });
}

function drawChart(data = []) {
  const chartData = new GoogleCharts.api.visualization.DataTable();

  chartData.addColumn("number", "Возраст");
  chartData.addColumn("number", "Баланс вложенных средств");
  chartData.addColumn("number", "Стоимость портфеля");
  chartData.addColumn({ type: "string", role: "annotation" });
  chartData.addColumn({ type: "string", role: "annotationText" });

  let minAge = 18,
    maxAge = 80;
  if (data.length) {
    minAge = data[0][0];
    maxAge = data[data.length - 1][0];
  }

  const options = {
    chartArea: { left: 85, top: 5, width: "92%", height: "90%" },
    legend: { position: "none" },
    hAxis: {
      title: "Возраст, лет",
      titleTextStyle: { color: "#333" },
      minValue: minAge,
      maxValue: maxAge,
    },
    vAxis: {
      title: "Стоимость, руб.",
      minValue: -10,
      maxValue: 10,
      format: "short",
    },
    seriesType: "area",
    series: { 2: { type: "line" } },
  };

  const chart = new GoogleCharts.api.visualization.ComboChart(
    document.getElementById("calculator-chart")
  );

  data.map((item) => chartData.addRow(item));

  chart.draw(chartData, options);
}

export { initChart, drawChart };

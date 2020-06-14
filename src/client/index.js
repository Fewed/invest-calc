import infl from "./inflation";
import { initChart, drawChart } from "./chart";
import { l, lis, sel, r } from "../utils";
import "./style.scss";

let data = {
  "age-start": 28,
  "age-mid": 40,
  "age-end": 80,
  "rate-profit": 5,
  "rate-infl": infl,
  "cash-start": 200000,
  "cash-add": 30000,
  "cash-sub": 29000,
  "cash-max": 0,
  "cash-final": 0,
};

lis("change", (e) => {
  e.preventDefault();
  checkInps();
  const dr = generateData();
  drawChart(dr);
  updateResults();
});

initInps();
const dr = generateData();
initChart(dr);
updateResults();

function updateResults() {
  const [sp1, sp2] = sel("#summary span");
  sp1.textContent = data["cash-max"].toLocaleString();
  sp2.textContent = data["cash-final"].toLocaleString();
}

function initInps() {
  sel("input").map((inp) => (inp.value = data[inp.getAttribute("name")]));
}

function checkInps() {
  sel("input").map(
    (inp) => (data[inp.getAttribute("name")] = parseFloat(inp.value))
  );
}

function generateData() {
  const ageStartMonth = 12 * data["age-start"],
    ageMidMonth = 12 * data["age-mid"],
    ageEndMonth = 12 * data["age-end"];

  //const yearChange = (1 + data["rate-profit"] / 100) / data["rate-infl"],
  const yearChange = 1 + data["rate-profit"] / 100,
    monthChange = Math.pow(yearChange, 1 / 12);

  let cashTemp = data["cash-start"],
    cashCont = data["cash-start"];

  const dataRows = [[data["age-start"], r(cashCont), r(cashTemp), null, null]];

  for (let i = ageStartMonth + 1; i < ageMidMonth; i++) {
    cashTemp = monthChange * cashTemp + data["cash-add"];
    cashCont += data["cash-add"];
    if (!(i % 12))
      dataRows.push([i / 12, r(cashCont), r(cashTemp), null, null]);
  }

  for (let i = ageMidMonth; i < ageEndMonth + 1; i++) {
    cashTemp = monthChange * cashTemp - data["cash-sub"];
    cashCont -= data["cash-sub"];

    if (!(i % 12))
      dataRows.push([i / 12, r(cashCont), r(cashTemp), null, null]);
  }

  data["cash-max"] = dataRows[data["age-mid"] - data["age-start"]][2];
  data["cash-final"] = r(cashTemp);

  return dataRows;
}

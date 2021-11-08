// To do
// -Get currency api
// store api in object
// set second currency to currency api
// API = 5967b0740d-06715449f3-r1p5s2
let firstCurrency = document.getElementById("first-currency");
let secondCurrency = document.getElementById("second-currency");
let convertBtn = document.getElementById("convert-btn");
let result = document.getElementById("result");
let resetBtn = document.getElementById("reset-btn");
let swapBtn = document.getElementById("swap-btn");
let currencyValuesApi = {};
// Select currency to begin with
// Select currency to covert to
// Get input amount
// Pressing button coverts the amount from C1 to C2, and store it in div result

// Reset all
resetBtn.addEventListener("click", () => {
  let amount = document.getElementById("input");
  let result = document.getElementById("result");

  firstCurrency.value = "RON";
  secondCurrency.value = "RON";
  document.getElementById("fromimg").src = "RON.png";
  document.getElementById("toimg").src = "RON.png";
  amount.value = "";
  result.innerHTML = "Result";
});
// Swap currency
swapBtn.addEventListener("click", () => {
  let c1 = firstCurrency.value;
  let c2 = secondCurrency.value;
  let temp;

  temp = c1;
  c1 = c2;
  c2 = temp;

  firstCurrency.value = c1;
  secondCurrency.value = c2;
  convertBtn.click();
  changeFlag(true);
  changeFlag(false);
});

//Convert with amount
convertBtn.addEventListener("click", () => {
  let currency1 = firstCurrency.value;
  let currency2 = secondCurrency.value;
  fetch(
    `https://freecurrencyapi.net/api/v2/latest?apikey=758494d0-40c6-11ec-a38d-6d3caadabd43`
  )
    .then((response) => response.json())
    .then((data) => {
      let amount = document.getElementById("input").value;
      if (currency2 === currency1) {
        result.innerHTML = Math.abs(amount);
      } else {
        // result.innerHTML = amount * data["result"][currency2];
        result.innerHTML = Math.abs(
          calculateCovert(data, currency1, currency2, amount)
        );
      }
    });
});

let calculateCovert = (data, currency1, currency2, amount) => {
  let from = data["data"][currency1];
  let to = data["data"][currency2];
  if (currency1 === "USD") {
    let result = amount * to;
    return result.toFixed(2);
  } else if (currency2 === "USD") {
    let result = amount / from;
    return result.toFixed(2);
  }

  let x;
  let y;

  x = amount / from;
  y = x * to;
  return y.toFixed(2);
};

let changeFlag = (from) => {
  // Daca from true, modifica c1, else modifica c2
  if (from === true) {
    document.getElementById("fromimg").src = `${firstCurrency.value}.png`;
  } else {
    document.getElementById("toimg").src = `${secondCurrency.value}.png`;
  }
};

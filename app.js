console.log("Currency Convertor");

const convertedVal = document.querySelector("#convertedVal");
const fromImg = document.querySelector("#fromImg");
const toImg = document.querySelector("#toImg");
const fromSelect = document.querySelector("#fromSelect");
const toSelect = document.querySelector("#toSelect");
const fromOption = document.querySelector("#fromOption");
const toOption = document.querySelector("#toOption");
const convertedValpara = document.querySelector("#convertedValpara");




for (let currencyCode in countryList) {
    const option = document.createElement("option");
    option.value = countryList[currencyCode]; // e.g., "USD"
    option.textContent = currencyCode; // visible text
    fromSelect.appendChild(option);
  }
fromSelect.addEventListener("change", () => {
      const selectedCurrency = fromSelect.value;
      fromImg.setAttribute("src", `https://flagsapi.com/${selectedCurrency}/flat/64.png`);
    });

    
for (let currencyCode in countryList) {
        const option = document.createElement("option");
        option.value = countryList[currencyCode]; // e.g., "USD"
        option.textContent = currencyCode; // visible text
        toSelect.appendChild(option);
      }
toSelect.addEventListener("change", () => {
    const selectedCurrency = toSelect.value;
    toImg.setAttribute("src", `https://flagsapi.com/${selectedCurrency}/flat/64.png`);
});



// const populate = async (value, selectedCurrency) => {

//     url = "https://latest.currency-api.pages.dev/v1/currencies/inr.json";

// }

const populate = async (amount, fromCurr, toCurr) => {
    try {
        const url = `https://latest.currency-api.pages.dev/v1/currencies/${fromCurr.toLowerCase()}.json`;
        const res = await fetch(url);
        const data = await res.json();

        const rate = data[fromCurr.toLowerCase()][toCurr.toLowerCase()];
        const convertedAmount = (amount * rate).toFixed(2);

        return convertedAmount;
    } catch (error) {
        console.error("Error fetching conversion:", error);
        return "Conversion error";
    }
};


const btn = document.querySelector(".btn");
btn.addEventListener("click", async (e)=>{
    e.preventDefault();
    const amount = parseFloat(document.querySelector("input[name = quantity]").value);
    // const targetCurrency = document.querySelector("select[name = currency]").value;

    // const fromCurr = fromSelect.value;
    const fromCurr = fromSelect.options[fromSelect.selectedIndex].text;
    // const toCurr = toSelect.value;
    const toCurr = toSelect.options[toSelect.selectedIndex].text;

    const result = await populate(amount, fromCurr, toCurr);
    convertedVal.innerText = `${amount} ${fromCurr} = ${result} ${toCurr}`;
    convertedValpara.innerText = result;


    console.log(fromCurr);
    console.log(toCurr);

    // convertedVal.innerText = "ankit";

});

// console.log(countryList[AED]);
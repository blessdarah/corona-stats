// initialize feather icons
feather.replace()

// general stats
const globalEndpoint = "https://coronavirus-19-api.herokuapp.com/all";
const $ = selector => document.querySelector(selector);

fetch(globalEndpoint)
    .then(response => response.json())
    .then(data => updateGlobalStats(data))
    .catch(error => console.log(error));

function updateGlobalStats(data) {
    console.log(data);
    const currentCases = $(".cases-count"),
        deathCases = $(".death-count"),
        recoveredCases = $(".recovered-count");

    currentCases.textContent = data.cases;
    deathCases.textContent = data.deaths;
    recoveredCases.textContent = data.recovered;
}

// all country stats
const countryEndpoint =
    "https://coronavirus-19-api.herokuapp.com/countries";
fetch(countryEndpoint)
    .then(response => response.json())
    .then(data => updateCountryStats(data))
    .catch(error => console.log(error));

function updateCountryStats(data) {
    data.forEach((item, index) => {
        const li = document.createElement('tr');
        li.className = 'country-list-body-item';
        li.innerHTML = `<td>${index + 1}</td>
                        <td>${item.country}</td>
                        <td>${item.cases}</td>
                        <td>${item.deaths}</td>
                        <td>${item.recovered}</td>`;
        const tableBody = $('.country-list-body');
        tableBody.appendChild(li);
    });
    let totalAffectedCountries = $('.affected-countries');
    totalAffectedCountries.textContent = data.filter(item => item.cases > 0).length;
}
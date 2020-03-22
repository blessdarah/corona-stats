// initialize feather icons
// feather.replace()

// getData from local storage
getDataFromLocalStorage(localStorage.getItem('stats'));

// general stats
const globalEndpoint = "https://coronavirus-19-api.herokuapp.com/all";
const $ = selector => document.querySelector(selector);

fetch(globalEndpoint)
    .then(response => response.json())
    .then(data => updateGlobalStats(data))
    .catch(error => console.log(error));

function updateGlobalStats(data) {
    // console.log(data);
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
    localStorage.setItem('stats', JSON.stringify(data));
    getDataFromLocalStorage('stats');
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

function getDataFromLocalStorage(cachedData) {
    // console.log(cachedData);
    return localStorage.getItem(cachedData);
}

/* Handle site search functionality */
// get search input

const statsInJson = JSON.parse(getDataFromLocalStorage('stats'));


let sortedListOfCountries = statsInJson.sort(
    (countryA, countryB) => countryA.country > countryB.country
);


const searchBar = document.querySelector('.search-form-input');

searchBar.addEventListener('keyup', event => {
    if (event.target.value != '' && event.key !== 'Enter') {
        document.querySelector('.search-result').classList.remove('hidden');
        const searchResult = getCountriesThatInclude(event.target.value);
        populateSearchResults(searchResult);
    } else {
        event.target.value = '';
        document.querySelector('.search-result').classList.add('hidden');

    }
})

function getCountriesThatInclude(stringPattern) {
    return sortedListOfCountries.filter(country =>
        country.country.toLowerCase().includes(stringPattern)
    );
}

// populate search results
function populateSearchResults(searchContent) {
    const searchResultsContainer = document.querySelector('.search-result');
    // empty results container first
    searchResultsContainer.innerHTML = '';


    searchContent.map(data => {
        const li = document.createElement('li');
        li.classList.add('search-featured-item');
        li.innerHTML = `<h5 class="country">${data.country}</h5>
    <p><strong>Cases: </strong> <span class="cases">${data.cases}</span></p>`;

        searchResultsContainer.appendChild(li);
    });
}
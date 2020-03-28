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
    .then(removeLoader)
    .catch(error => console.log(error));

function updateCountryStats(data) {
    // console.log(data);
    localStorage.setItem('stats', JSON.stringify(data));
    getDataFromLocalStorage('stats');
    data.forEach((item, index) => {
        const li = document.createElement('tr');
        li.className = 'country-list-body-item';
        li.id = item.country;
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

// remove loader function 
function removeLoader() {
    document.querySelector(".loader").style.display = 'none';
}

/* Handle site search functionality */
// get search input

const statsInJson = JSON.parse(getDataFromLocalStorage('stats'));


let sortedListOfCountries = statsInJson.sort(
    (countryA, countryB) => countryA.country.toLowerCase() > countryB.country.toLowerCase()
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
});

searchBar.addEventListener('blur', () => {
    document.querySelector('.search-result').classList.add('hidden');
    document.querySelector('.search-form-input').value = '';
});

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

        li.innerHTML = `<a data-country="${data.country}">
                            <h5 class="country">${data.country}</h5>
                            <p><strong>Cases: </strong> <span class="cases">${data.cases}</span></p>
                        </a>`;
        li.querySelector('a').addEventListener('click', () => alert('working'));

        searchResultsContainer.appendChild(li);
    });
}

// get country stats
function getCountryStats(country) {
    alert('clicked');
}
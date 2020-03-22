const stats = localStorage.getItem("stats");

const statsInJson = JSON.parse(stats);

const log = item => console.log(item);
// log(statsInJson);

// foreach loop
// statsInJson;

let sortedListOfCountries = statsInJson.sort(
    (countryA, countryB) => countryA.country > countryB.country
);

log(sortedListOfCountries);

//  filtering content from list
// get all countries that start with any pattern
function getCountriesThatStartWith(startString) {
    return sortedListOfCountries.filter(country =>
        country.country.toLowerCase().startsWith(startString)
    );
}

function getCountriesThatInclude(stringPattern) {
    return sortedListOfCountries.filter(country =>
        country.country.toLowerCase().includes(stringPattern)
    ).map(countryObject => countryObject.country);
}

const cCountries = getCountriesThatInclude("un");

log(cCountries);
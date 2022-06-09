/**
 * Takes a string as an argument, and returns an array of strings
 * @param cityInput - the input field where the user will type the city name
 */
function getCities(cityInput)
{
    let nom = citySearched.value;
    const url = `https://geo.api.gouv.fr/communes?nom=${nom}&fields=departement&boost=population&limit=5`;

    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            let names = [];
            let name;
            for (let i = 0; i < data.length; i++) {
                name = names.push(data[i].nom);
            }
            autocomplete(cityInput, names);
        })
        .catch(error => {
            console.log("erreur : " + error);
        });
}

let citiesList = document.querySelector(".auto-complete-list");

/**
 * The function takes two arguments, the input field and an array of possible autocompleted values. It then loops through
 * the array and creates a span element for each value in the array. It then adds a click event listener to each span
 * element. When the span element is clicked, the value of the input field is set to the value of the span element
 * @param inp - the input field
 * @param arr - an array of strings
 */
function autocomplete(inp, arr) {
    for (let i = 0; i < arr.length; i++) {
        let cities = document.createElement("span");
        cities.innerHTML = arr[i];
        cities.classList.add("auto-complete-cities");
        citiesList.appendChild(cities);
    }

    let allCities = document.querySelectorAll(".auto-complete-cities");

    allCities.forEach(city => {
       city.addEventListener("click", e => {
           citySearched.value = city.innerHTML;
           citiesList.innerHTML = "";
           API(citySearched.value);
           e.preventDefault();
       });
    });
}

let cityInput = document.getElementById("city-search");

/* Event listener that listens for a keyup event. When the event is triggered, it removes all the cities
that were previously displayed in the autocomplete list. It then calls the getCities function. */
cityInput.addEventListener("keyup", function(event) {
    let allCities = document.querySelectorAll(".auto-complete-cities");
    allCities.forEach(city => {
        city.remove();
    });
    getCities(cityInput);
});

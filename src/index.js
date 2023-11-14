console.clear();

function getWeather(location) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=0d23b12804e64ad0b8673526231411&q=${location}`, {mode: 'cors'}).then(function(response) {
    return response.json();
}).then(function(response) {;
    console.log(response);
    const tgon = response.current;
})
}

getWeather('traralgon');

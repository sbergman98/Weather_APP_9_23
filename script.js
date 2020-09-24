let container = $("#weather-forecast")

const cityInput = document.getElementById("weatherFinder");
const updateBTN = document.getElementById("update");

// displayweatherInfo function re-renders the HTML to display the appropriate content
function displayWeatherInfo() {
    console.log("line8")

   // let city = $(this).attr("data-name");
   const city = cityInput.value
    let queryURL = "api.openweathermap.org" + city + "&APPID=80717ebb3855271ef75979a7da80f371";

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        let newDiv = $("<div>").prependTo(container)

        let cityName = $("<h1>").appendTo(newDiv)
        cityName.text(response.Name)

        let cityTempature = $("<p>").appendTo(newDiv)
        cityTempature.text("Tempature: " + main.temp)

        let cityHumidity = $("<p>").appendTo(newDiv)
        cityHumidity.text("Humidity: " + main.humidity)

        let windSpeed = $("<p>").appendTo(newDiv)
        windSpeed.text("Wind Speed: " + windSpeed.speed)


    });

    // Function for displaying weather data


}

updateBTN.addEventListener("click", displayWeatherInfo) 
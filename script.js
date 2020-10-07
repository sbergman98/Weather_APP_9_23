

var todaysDate = moment().format('');
var searchHistory = [];
var cityContainer = $("#cityContainer");
var searchField = $("#enteredCity")
const nameAndDate = $('#nameAndDate');
const todaysTemperature = $("#todaysTemperature");
const todaysHumidity = $("#todaysHumidity");
const todaysWindSpeed = $("#todaysWindSpeed");
const todaysUVIndex = $("#todaysUVIndex");
const forecastList = $("#forecastList");
var searchButton = $("#searchButton")
var lastCity = "";
const apiKey = '0cc03a063f157437f99b33adb6adbed9';

function getFarenheit (kelvin) {
    return Math.ceil(((kelvin - 273.15) * 9 / 5) + 32)    
    }

// ajax call to get today's weather by cityname,lat,long
function searchCity(cityName) {
  $.ajax({
    url: 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + `&appid=${apiKey}`,
    method: "GET"
  })
  .then(function (response) { 
    console.log(response);
    

    

    nameAndDate.html(`${response.name} (${moment(response.dt * 1000).format(`MM/DD/YYYY`)})`);
    todaysTemperature.text("Temperature: " + getFarenheit(response.main.temp));
    todaysHumidity.text("Humidity: " + response.main.humidity);
    todaysWindSpeed.text("Windspeed: " + response.wind.speed);
    



    // ajax call to get 5 day forecast

    function searchCity(cityName) {
      $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + `&appid=${apiKey}`,
        method: "GET"
      })
      

       .then(function (response) {
        dailyData = response.list.filter((increment) => increment.dt_txt.slice(11, 13) === '12');
        let dailyHTML = '';
        console.log(dailyData)
        for (let day of dailyData) {
          dailyHTML += `
            <li class="forecastDay">
              <h3>(${moment(day.dt * 1000).format('MM/DD/YYYY')})</h3>
              <img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" />
              <p>Temp: ${getFarenheit(day.main.temp)}</p>
              <p>Humidity: ${day.main.humidity}</p>
            </li>
          `;
        }
        console.log(dailyHTML)
        forecastList.html(dailyHTML);
      });





    
    }

  



    searchCity(cityName);

    var searchedCity = $('#enteredCity')
      .val()
      .trim();

    list.push(searchedCity);

    //renderCities(list);
  })
}

// show weather to user
function showWeather(event) {
  event.preventDefault();
  if (searchField.val().trim() !== "") {
    lastCity = searchField.val().trim();
  };
};

$("#searchButton").click((event) => {
  event.preventDefault();
  console.log('button was pressed');
  let enteredCity = $("#enteredCity").val();
  searchHistory.push(enteredCity);
  let historyHTML = '';
  for (let city of searchHistory) {
    historyHTML += `
      <li class="historyItem">${city}</li>
    `
  }
  console.log({ historyHTML })
  cityContainer.html(historyHTML);
  searchCity(enteredCity);
 
});
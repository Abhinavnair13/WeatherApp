async function getWeather(city) {
  const weatherApiKey = "45ce8f4a502a6de1d9730729711c1f40";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  const weatherResponse = await fetch(apiUrl + `&appid=${weatherApiKey}`);

  var data = await weatherResponse.json();
  if (weatherResponse.status == 404) {
    alert("Invalid city name");
  } else {
    console.log(data);
    const weatherIcon = document.getElementById("weatherIcon");
    document.getElementById("loc_name").innerHTML = data.name;

    document.getElementsByClassName("humidity")[0].innerHTML =
      data.main.humidity + " %";
    document.getElementById("feels_like").innerHTML =
      data.main.feels_like.toFixed(1) + " °C";

    document.getElementById("weatherCondition").textContent =
      data.weather[0].main;
    document.getElementsByClassName("temp")[0].innerHTML =
      data.main.temp.toFixed(1) + " °C";
    document.getElementById("temp_max").innerHTML =
      data.main.temp_max.toFixed(1) + " °C";
    document.getElementById("temp_min").innerHTML =
      data.main.temp_min.toFixed(1) + " °C";
    document.getElementsByClassName("wind_speed")[0].innerHTML =
      data.wind.speed + " km/hr";
    document.getElementById("lat").innerHTML = data.coord.lat;
    document.getElementById("lon").innerHTML = data.coord.lon;

    if (data.weather[0].main == "Haze") {
      weatherIcon.src = "assets/mist.png";
    } else if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "assets/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "assets/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "assets/drizzle.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "assets/rain.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "assets/snow.png";
    }
  }
}

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  var city = document.getElementById("city");
  getWeather(city.value);
  backgroundImage(city.value);
});

//for search oriented background image using unsplash api
async function backgroundImage(inputData) {
  const unsplashApiKey = "hx60jV0XTsXtEZ9q2_-y8eQj9YjfePXxxPAyuY2MMMQ";
  const unsplashUrl = `https://api.unsplash.com/search/photos?`;
  const unsplashResponse = await fetch(
    unsplashUrl + `page=1&query=${inputData}&client_id=${unsplashApiKey}`
  );
  const data = await unsplashResponse.json();
  console.log(data);
  console.log("data");
  const backgroundImageUrl = "url(data.results[0].urls.raw)";
  console.log(backgroundImageUrl);

  document.body.style.backgroundImage =
    "url(" + data.results[1].urls.raw + "fit=crop&w=1600" + ")";
}

//By default page will be set to -
getWeather("Vadodara");
backgroundImage("vadodara");

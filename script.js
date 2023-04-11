document.addEventListener("DOMContentLoaded", () => {


    // Vars
    
    const locationInput = document.querySelector("#inputLocation"),
          locationForm = document.querySelector(".weather__form"),

          cityName = document.querySelector(".weather__info__city"),
          temperature = document.querySelector(".weather__info_temp"),
          weatherDescr = document.querySelector(".weather__info_wordForm"),
          windSpeed = document.querySelector(".windSpeed"),
          humidity = document.querySelector(".humidity"),
          pressure = document.querySelector(".pressure"),
          weatherIcon = document.querySelector(".weather__info__icon img");


    //  Set Weather by default
    
    getWeather("Sydney")
        .then(data => {

            successWeatherResp(data);

        })
        .catch(() => {

            errorWeatherResp()
            
        });


    // Set weather by user input
    
    locationForm.addEventListener("submit", e => {
        e.preventDefault();

        locationInput.placeholder = "Loading...";

        getWeather(locationInput.value)
            .then(data => {

                successWeatherResp(data);

            })
            .catch(() => {

                errorWeatherResp()

            });

        setTimeout(() => {
            locationInput.placeholder = "";
        }, 4000)

        locationForm.reset();
    })


    // Functions
    
    async function getWeather (location) {
        return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6b633e1fb047126be69259e5b820d375&units=metric`)
            .then(resp => resp.json());
    } 

    async function getWeatherIcon (pngName) {
        return await fetch(`https://openweathermap.org/img/wn/${pngName}.png`)
            .then(resp => resp.blob())
            .then(blob => URL.createObjectURL(blob));
    }

    function successWeatherResp (data) {

        locationInput.placeholder = "Done!";


        setValues(cityName, data.name); 

        setValues(temperature, Math.round(data.main.temp) + "<sup>°C</sup>");

        setValues(weatherDescr, data.weather[0].main);

        setValues(windSpeed, data.wind.speed + " m/s");

        setValues(humidity, data.main.humidity + "%");

        setValues(pressure, data.main.pressure + " hPa");
        

        getWeatherIcon(data.weather[0].icon)
        .then(data => {
            weatherIcon.src = data;
        })

    }

    function errorWeatherResp () {
        setValues(document.querySelector(".weather__info__city"), "City not found!");

        weatherIcon.src = "img/warning.png";
    }

    function setValues (element, value) {
        element.innerHTML = "";
        element.innerHTML = value;
    }



});
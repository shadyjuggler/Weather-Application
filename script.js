// 6b633e1fb047126be69259e5b820d375

document.addEventListener("DOMContentLoaded", () => {

    const locInput = document.querySelector("#inputLocation"),
          locForm = document.querySelector(".weather__form");

    locForm.addEventListener("submit", e => {
        e.preventDefault();

        locInput.placeholder = "Loading..."

        getWeather(locInput.value)
        .then(data => {
            locInput.placeholder = "Done!"
            console.log(data)

            setValues(document.querySelector(".weather__info__city"), data.name)
            // console.log(getWeatherValues(data, "humidity"))
            setValues(document.querySelector(".weather__info_temp"), (getWeatherValues(data, "temp") / 32).toFixed(10) + "<sup>°C</sup>")
        });

        setTimeout(() => {
            locInput.placeholder = "";
        }, 4000)

        locForm.reset();
    })


    async function getWeather (location) {
        return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6b633e1fb047126be69259e5b820d375`)
        .then(resp => resp.json())
    } 


    function getWeatherValues (obj, value) {
        return obj["main"][value];
    }

    function setValues (element, value) {
        element.innerHTML = "";
        element.innerHTML = value;
    }

})
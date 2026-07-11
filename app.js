const form = document.querySelector("form")
const weatherInput = document.querySelector("#weatherInput")
const countryPlaceholder = document.querySelector("#country")
const cityPlaceholder = document.querySelector("#city")
const temperaturePlaceholder = document.querySelector("#temperature")
const weatherPlaceholder = document.querySelector("#weather")
const weatherDescription = document.querySelector("#weatherDescription")
const img = document.querySelector("img")
const info = document.querySelector("#info")

const weatherApi = async (city) => {
    try {
        const config = {
            params: {
                q: city,
                appId: "ac2b85cb8d99b66d9be80cf7a6523696",
                units: "metric"
            }
        }
        const req = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, config)

        return req.data

    } catch (e) {
        console.log("ERROR! NOT FOUND", e)
    }
}

const grabWeatherInp = () => {
    if (!weatherInput.value || isNaN(weatherInput.value)) {
        return weatherInput.value.trim()
    }
}

const createImg = (data) => {
    if (data.weather[0].main === "Clouds") {
        img.src = `images/cloudy.gif`
        img.alt = "Cloudy Weather"
        img.classList.add("h-[20rem]")
    }
    else if (data.weather[0].main === "Clear") {
        img.src = `images/clear.gif`
        img.alt = "Clear Weather"
        img.classList.add("h-[20rem]")
    } else if (data.weather[0].main === "Rain" || data.weather[0].main === "Drizzle") {
        img.src = `images/rainy.gif`
        img.alt = "Rainy Weather"
        img.classList.add("h-[20rem]")
    } else if (data.weather[0].main === "Snow") {
        img.src = `images/snowy.gif`
        img.alt = "Snowy Weather"
        img.classList.add("h-[20rem]")
    } else if (data.weather[0].main === "Thunderstorm") {
        img.src = `images/thunderstorm.gif`
        img.alt = "Thunderstorm Weather"
        img.classList.add("h-[20rem]")
    }
}

const renderInfo = (data) => {
    cityPlaceholder.textContent = data.name
    countryPlaceholder.textContent = `${data.sys.country},`
    createImg(data)
    temperaturePlaceholder.textContent = `${data.main.temp}°F`
    weatherPlaceholder.textContent = data.weather[0].main
    weatherDescription.textContent = data.weather
        .map(item => item.description.charAt(0).toUpperCase() + item.description.slice(1))
        .join(', ');
}

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    if (!weatherInput.value || isNaN(weatherInput.value)) {
        const data = await weatherApi(grabWeatherInp())
        renderInfo(data)
    }

    info.classList.add("max-h-[500px]")
    weatherInput.value = ''
})

//requiscoes de imagem e api
const apykey = "824a45cfcc99dc54ad93dc6ed791d927";
const apicountryURL = "https://flagsapi.com/flat/64.png";
const imagem = "https://source.unsplash.com/1700x1080/?";
const apikeyHora = "V6I2W9N0TUX2"
const apihora = "http://api.timezonedb.com/v2.1/get-time-zone?"

//requisicoes
const cityInput = document.getElementById('city-input');
const searchBtn = document.querySelector("#search");
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const WeatherElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");
const error = document.querySelector("#error-message");
const Sugestoes = document.querySelectorAll("#sugestoes button")
const horario = document.querySelector("#hora span")



//funcoes
const showerror = () => {
    error.classList.remove("hide");
}

const hideinformation = () => {
    error.classList.add("hide");
    weatherContainer.classList.add("hide");
}
//api 
const getweatherdata = async (city) => {
    const apiweatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apykey}&lang=pt_br`;

    const res = await fetch(apiweatherURL);
    const data = await res.json();

    console.log(data);
    return data;
};

const weatherdata = async (city) => {
    hideinformation();

    const data = await getweatherdata(city);

    if (data.cod === "404") {
        showerror();
    };

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    WeatherElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);
    umidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`

    //image
    document.body.style.backgroundImage = `url("${imagem + city}")`;

    weatherContainer.classList.remove("hide");

    //horario (nao e eficiente)
    setInterval(() => {
        let date = new Date()
        let dHour = date.getHours()
        let dMinute = date.getMinutes()
        let dSec = date.getSeconds()


        let BR = `Horario Local: ${dHour}:${dMinute}:${dSec}`;

        //hora espanha(este codigo funciona porem tem problema que selecionacionas 15 mas dps se passar uma hora seria 16 mas ainda continua 15, o certo seria usarmos uma api porem nao temos e nem encontramos!)
        //não é eficiente
        let dateES = new Date();
        dateES.setHours(0);
        let horaES = dateES.getHours();

        let ES = `Horario local: ${horaES}:${dMinute}:${dSec}`;

        if (countryElement.getAttribute('src') === `https://flagsapi.com/BR/flat/64.png`) {
            horario.innerText = BR;
        } else if (countryElement.getAttribute('src') === 'https://flagsapi.com/ES/flat/64.png') {
            horario.innerText = ES;
        }

    }, 1000);

};

//eventos

//botao lupa
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const city = cityInput.value;

    weatherdata(city);
});

//click do enter fazendo o mesma funcao da lupa
cityInput.addEventListener("keyup", (e) => {
    e.preventDefault();

    if (e.code === "Enter") {
        const city = e.target.value;

        weatherdata(city);
    }
});

//sugestoes
Sugestoes.forEach((btn) => {
    btn.addEventListener('click', () => {
        const city = btn.getAttribute("id");

        weatherdata(city);
    });
});



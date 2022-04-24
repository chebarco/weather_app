const form = document.querySelector(".search-loaction");
const input = document.querySelector(".search-loaction input");
const timeImage = document.querySelector(".card-top img");
const cityName = document.querySelector(".city-name p");
const cardBody = document.querySelector(".card-body");
const cardInfo = document.querySelector(".back-card");

const apiKey = "3ab33a513cd08f804cb231266b248bea";


const isDayTime = (icon) => {
  if (icon.includes('d')) { return true }
  else { return false }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputVal = input.value;

  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric&lang=es`;



  //APLICAMOS FETCH
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, sys, weather, wind } = data;

      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

      const imageName = weather[0].icon;
      // const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`;





      //lo mostramos en el html
      cityName.textContent = data.name;
      cardBody.innerHTML = `
        <h2 class="city-name text-center" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <h3 class="city-temp text-center">${Math.round(main.temp_max)}<sup>°C</sup></h3>
        <div class="city-temp_min text-center">${Math.round(main.temp_min)}<sup>°C</sup></div>
        
        <figure>
          <img class="city-icon mx-auto mx-auto d-block" src="${icon}" alt="${weather[0]["description"] }">
        </figure>
        
      </div>
      <div class="card-bottom px-5 py-4 row">
        <div class="col text-right">
          <p>${Math.round(main.feels_like)}&deg;C</p>
          <span>Sensacion termica 😶‍🌫️</span>
        </div>
        <div class="col text-left">
          <p>${main.humidity}%</p>
          <span>Humedad 💦</span>
        </div>
        <div class="col text-right my-5">
          <p>${wind.speed}</p>
          <span>Viento 💨</span>
        </div>
        <div class="col text-left my-5">
        <p>${main.pressure}</p>
        <span>Presion 🥵</span>
      </div>
      </div>
   `;

      if (isDayTime(imageName)) {
        timeImage.setAttribute("src", "img/day_image.svg");
        if (cityName.classList.contains("text-white")) {
          cityName.classList.remove("text-white");
        } else {
          cityName.classList.add("text-black");
        }
      } else {
        console.log("night");
        timeImage.setAttribute("src", "img/night_image.svg");
        if (cityName.classList.contains("text-black")) {
          cityName.classList.remove("text-black");
        } else {
          cityName.classList.add("text-white");
        }
      }

      cardInfo.classList.remove("d-none");



    })
  });


//local storage

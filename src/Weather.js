import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  let [weather, setWeather] = useState({});

  const form = (
    <form onSubmit={submitCity}>
      <input
        type="search"
        placeholder="Enter your city"
        onChange={updateCity}
      />
      <input type="submit" value="Search" />
    </form>
  );
  function showWeather(response) {
    console.log(response);
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }
  function updateCity(event) {
    setCity(event.target.value);
  }
  function submitCity(event) {
    event.preventDefault();
    let apiKey = "5c08670149a0b1a4dc7a372a3d5e5333";
    let units = "metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    console.log(url);
    axios.get(url).then(showWeather);
  }

  if (loaded) {
    return (
      <>
        {form}
        <ul>
          <li>{Math.round(weather.temperature)}°C</li>
          <li>{weather.description}</li>
          <li>{weather.humidity}%</li>
          <li>{weather.wind} km/h</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </>
    );
  } else {
    return form;
  }
}

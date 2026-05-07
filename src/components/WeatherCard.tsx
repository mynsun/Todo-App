import { useEffect, useState } from "react";
import "./WeatherCard.css";

type WeatherData = {
  name: string;
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
  };
};

export default function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const response = await fetch(
  //         `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lang=kr&q=seoul`,
  //       );
  //       const data = await response.json();
  //       setWeather(data);
  //     };
  //     fetchData();
  //   }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = import.meta.env.VITE_OPEN_WEATHER_KEY;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lang=kr&lat=${lat}&lon=${lon}`,
        );
        const data = await response.json();
        setWeather(data);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  if (!weather) {
    return <div>날씨를 불러오는 중입니다...</div>;
  }

  const icon = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
  const description = weather.weather[0].description;
  const temp = weather.main.temp.toFixed(1);
  return (
    <div className="weather-container">
      <img src={iconUrl} alt="weather icon" />
      <p>
        {description} | {temp}℃
      </p>
    </div>
  );
}

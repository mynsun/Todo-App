import "./Header.css";
import WeatherCard from "./WeatherCard";

function Header() {
  return (
    <div className="Header">
      <h3>오늘은 📅</h3>
      <div className="date-weather">
        <h1>{new Date().toDateString()}</h1>
        <WeatherCard />
      </div>
    </div>
  );
}

export default Header;

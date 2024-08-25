import hotBg from "./assets/hot.jpg"
import coldBg from "./asset/cold.jpg"
import Discriptions from "./component/Discription";
import { useEffect, useState } from "react";
import { getWeatherData } from "./weather";
function App() {
  const [city, setCity] = useState("Gwalior");
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [bg, setBg] = useState(hotBg);


  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeatherData(city, unit);
      setWeather(data); 

      const threshold = unit === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    };
    fetchWeatherData();
  }, [unit,city]);

  const handleUnitClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnit(isCelsius ? "metric" : "imperial");
  }

  const enterKeyPressed = async (e) => {
    if (e.keyCode === 13) {
        const enteredCity = e.currentTarget.value.trim();
        if (enteredCity) {
          try{
            const data = await getWeatherData(enteredCity, unit);
            if (data) {
                if (data.name.toLowerCase() === enteredCity.toLowerCase()) {
                  setCity(data.name);
                  e.currentTarget.blur();
                }else{
                  alert("Please enter valid city name..")
                }
            } 
          } catch{
            console.log("There was an error fetching the weather data. Please try again.");
          }
        } else {
            alert('Please enter a city name.');
        }
    }
  };
 
  return (
    <div className="App" style={{backgroundImage:`url(${bg})`}}>
      <div className="overlay">
        {weather && (
          <div className="container">
          <div className="section section__inputs">
          <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={(e) => handleUnitClick(e)}>°F</button>
          </div>
          <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weather icon"/>
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
               <h1>{`${weather.temp.toFixed()} °${
                  unit === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>
            <Discriptions weather={weather} units={unit}/>
        </div>
        )}
        
      </div>
    </div>
  );
}


export default App;

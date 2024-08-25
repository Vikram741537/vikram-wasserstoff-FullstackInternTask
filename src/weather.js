const API_KEY = "0e352c69b9bc02131dc807031f5d5358";
const makeURL = (iconId) =>`https://openweathermap.org/img/wn/${iconId}@2x.png`;
const getWeatherData = async (city, units = "metric") =>{
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
    

    const data = await fetch(URL)
      .then((res) => res.json())
      .then((data) => data);
      console.log(data.name);
      

      const {
        weather,
        main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
        wind: { speed },
        sys: { country },
        name,
      } = data;
      const { discription, icon } = weather[0];    
      
      return {
        discription,
        iconURL: makeURL(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name,
      };
};

export {getWeatherData};
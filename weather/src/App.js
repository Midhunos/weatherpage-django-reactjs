import { useEffect, useState } from "react";
import  coldsBg from  "./assets/wint.jpg";
import  landBg from "./assets/eng.jpg";
import Descriptions from "./components/descriptions";
import { getFormattedWeatherData } from "./weatherservice";


function App() {
  const [city,setCity]=useState("paris");
  const [weather,setWeather]=useState(null);
  const [units,setUnits]=useState("metric");
  const [bg,setBg]=useState(coldsBg);



  useEffect(() => {
    const fetchWeatherData=async()=>{
      const data = await getFormattedWeatherData(city,units);
     setWeather(data);

    //  dymanic bg changes when weather changes
     const threshold = units ===`metric`? 20 : 60;
     if (data.temp <= threshold) setBg(coldsBg)
     else setBg(landBg)

    };

   fetchWeatherData();
  },[city,units]);
  
   const handleunitClick=(e)=>{
    const button=e.currentTarget;
    const currentUnit=button.innerText.slice(1);

    const isCelsius =currentUnit==="°C";
        button.innerText=isCelsius ? "°F":"°C";
         setUnits(isCelsius ? "metric":"imperial");

   }
   const enterKeyPressed=(e)=>{
    if(e.keyCode===13){
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
   }

  return (
    <div className="App" style={{backgroundImage:`url(${bg})`}}>
      <div className="overlay">
        {weather && 
        (
          <div className="container">
          <div className="section section__inputs">
           <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter City"/>
           <button onClick={(e)=>handleunitClick(e)}>°F</button>
          </div>
         <div className="section section__temperature">
          <div className="icon">
            <h4>{`${weather.name}`}     {`${weather.country}`}</h4>
            <img src={weather.iconURL} alt="weatherIcon"/>
            <h5>{weather.description}</h5>

          </div>
          <div className="temperature">
            <h1>{`${weather.temp.toFixed()} ${units === "metric"? "°C": "°F"}`}</h1>
          </div>
         </div>


         {/* {bottom description} */}
         <Descriptions weather={weather} units={units}/>
        </div>
       )
        
        }
        

      </div>

    </div>
  );
}

export default App;

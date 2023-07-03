const API_KEY='fa7fffeca65b44264beaa7cbb2a5a2a3'

const makeIconURL=(iconId)=>`https://cdn4.iconfinder.com/data/icons/weatherful/72/Foggy-128.png`

const getFormattedWeatherData=async(city,units='metric')=>{
    const URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data=await fetch(URL)
    .then((res)=>res.json())
    .then((data)=> data);
    const {
        weather,
        coord:{lat,lon},
        main:{temp,feels_like,temp_min,temp_max,pressure,humidity},
        wind:{speed},
        sys:{country},
        name,
    }=data;
    const {description,icon}=weather[0];
    return{
        description,
        iconURL:makeIconURL(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name,
        lon,
        lat,
       
       }
};
export  {getFormattedWeatherData};
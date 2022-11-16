import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import "./style.css"

function Weather(){

    const [serachValue,setSearchValue]  = useState("Bihar");

    const [tempInfo,setTemInfo] = useState([]);
    
   async function getWeatherInfo(){


        try{
            let url =` https://api.openweathermap.org/data/2.5/weather?q=${serachValue}&units=metric&appid=8ca1495cce1ab25e4fcf2f8578a06b17`;

            const res = await fetch(url);
            const data = await res.json();

           const {temp,humidity,pressure} = data.main;
           const {main :weathermood}  = data.weather[0];
           const {name} = data;
           const {speed} = data.wind;
           const {country,sunset} = data.sys;

           const myNewWeatherInfo  ={

            temp,

            humidity,
            pressure,

            weathermood,

            name,

            speed,
            country,
            sunset
           };

           setTemInfo(myNewWeatherInfo);
        

        }catch(err){
            console.log(err)
        }


        
    }

  useEffect(()=>{

    getWeatherInfo();


  },[])


    return(
        <>
        <div className="wrap">
            <div className="search">
                
                <input type="search" id="search" autoFocus placeholder="Search..." className="searchTerm" value={serachValue}
                onChange={(event)=>setSearchValue(event.target.value)}
                />
                <button type="button" className="searchButton" onClick={getWeatherInfo}>Search</button>

            </div>
        </div>

       <WeatherCard tempInfo={tempInfo}/>

        </>
    )
}

export default Weather;
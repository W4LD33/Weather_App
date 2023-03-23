import React, { useEffect } from 'react';
import { useState } from 'react';
import './style.css'

export default function Fetch(){
    const [weather, setWeather] = useState({})
    const [hour, setHour] = useState(0)
    const [chart, setChart] = useState({})
    
    useEffect(function() {
        fetch('https://api.oceandrivers.com/v1.0/getWeatherDisplay/ikauna17/?period=latestday')
            .then(res => res.json())
            .then(data => setWeather(data))
    }, [hour])

    function handlePlus(){
        if (hour < 23){
            setHour(hour + 1)
        }
    }

    function handleMinus(){
        if (hour > 0){
            setHour(hour - 1)
        }
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const yyyymmdd = `${year}/${month}/${date} ${hour}:00`;


    return (
        <div className='container'>
            <div className='main'>
                <h1>{weather.TEMPERATURE && weather.TEMPERATURE[hour]}°C</h1>
                <h3>Kaunas, Lithuania</h3>
                <div className='main-date'>
                    <h2>{yyyymmdd}</h2>
                    <button onClick={handleMinus}>-</button>
                    <button onClick={handlePlus}>+</button>
                </div>
            </div>
        </div>
    )
}
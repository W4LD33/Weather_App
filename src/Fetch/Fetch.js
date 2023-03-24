import React, { useEffect, useState} from 'react';
import './style.css'
import Chart from "react-apexcharts"

export default function Fetch(props){
    const [weather, setWeather] = useState({})
    const [hour, setHour] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [location, setLocation] = useState("")
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [city, setCity] = useState("")

    const handleChange = (e) => {
        setCity(e.target.value)
        console.log(city)
    }    


    useEffect(() => {
        fetchCityData();
    }, [city])

    useEffect(() => {
        if (location){
            fetchData();
        }
    }, [location, latitude, longitude])

    
    const fetchCityData = async () => {
        try {
            // Call API to get the latitude and longitude of the city of London
            // let city = 'Kaunas';
            const res = await fetch(`https://api.api-ninjas.com/v1/geocoding?city=${city}`, {
                headers: { 'X-Api-Key': 'CRu6zFFZMqCAeSwMRdZJLg==HqHGlRBF5SJZ4cuZ'},
                contentType: 'application/json'
            });
            const locationData = await res.json();
            setLocation(locationData)
            setLatitude(locationData[0].latitude)
            setLongitude(locationData[0].longitude)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const fetchData = async () => {
        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1`);
            const data = await res.json()
            setWeather(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const tempArray = weather.hourly?.temperature_2m || [];
    const timeArray = weather.hourly?.time || [];

    const chartTimeArray = timeArray.map(time => {
        return time.slice(-5)
    })

    // const chartTempArray = tempArray.map(temp => `${temp}°C`)

    function handlePlus(){
        setHour(hour + 1)
    }

    function handleMinus(){
        if (hour > 0){
            setHour(hour - 1)
        }
    }

    if (isLoading || !location) {
        return <div>Loading...</div>
    }

    return (
        <div className='container'>
            <div className='main'>
                <h1>{location && tempArray[hour]}°C</h1>
                <input
                    type='string'
                    placeholder='Enter a city name:'
                    name='city'
                    onChange={handleChange}
                    value={city}
                />
                <h3>Kaunas, Lithuania</h3>
                <div className='main-date'>
                    <h2>{timeArray[hour]?.replace('T'," ")}</h2>
                    <button onClick={handleMinus}>-</button>
                    <button onClick={handlePlus}>+</button>
                </div>
            </div>
        <Chart 
        options={{ xaxis: {categories: chartTimeArray }}}
        series={[{ data: tempArray, name: "Temperature" }]}
        type="line"
        width="100%"
        height="400"
        />
        </div>
    )
}

import React, { useEffect, useState} from 'react';
import './style.css'
import Chart from "react-apexcharts"

export default function Fetch(props){
    const [weather, setWeather] = useState({})
    const [hour, setHour] = useState(new Date().getHours())
    const [isLoading, setIsLoading] = useState(true)
    const [location, setLocation] = useState("")
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [city, setCity] = useState("")
    const [formSubmit, setFormSubmit] = useState(false)
    const [days, setDays] = useState(1)

    const handleChange = (e) => {
        setCity(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFormSubmit(true);
    }


    useEffect(() => {
        if (formSubmit){
            fetchCityData();
            setFormSubmit(false)
        }
    }, [formSubmit])

    useEffect(() => {
        if (latitude && longitude){
            fetchData();
        }
    }, [latitude, longitude, days])

    
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
            console.log(locationData)
            setLatitude(locationData[0].latitude)
            setLongitude(locationData[0].longitude)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const fetchData = async () => {
        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=${days}`);
            const data = await res.json()
            setWeather(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const tempArray = weather.hourly?.temperature_2m || [];
    console.log(tempArray)
    console.log(tempArray.length)
    const timeArray = weather.hourly?.time || [];

    const chartTimeArray = timeArray.map(time => {
        return time.slice(-5)
    })

    function handlePlus(){
        if (hour < tempArray.length - 1){
            setHour(hour + 1)
        } else {
        alert("Cannot go beyond the available data points.");
      }
    }

    function handleMinus(){
        if (hour > 0){
            setHour(hour - 1)
        }
    }

    function addDays(){
        if (days < 7){
            setDays(days + 1)
        } else {
        alert("Cannot go beyond the available data points.");
      }
    }

    function deductDays(){
        if (days > 0){
            setDays(days - 1)
        }
    }


    return (
        <div className='container'>
            <div className='main'>
                <div className='main-date'>
                    <h1>{location && tempArray[hour]}°C </h1>
                    <h2>{timeArray[hour]?.replace('T'," ")}</h2>
                    <button onClick={handleMinus}>-</button>
                    <button onClick={handlePlus}>+</button>
                </div>
                
                {!isLoading ? "" :
                <form onSubmit={handleSubmit}>
                    <input
                        type='string'
                        placeholder='Enter a city name:'
                        name='city'
                        onChange={handleChange}
                        value={city}
                    />
                    <button type='submit'>Submit</button>
                </form>
                }

                <div className='main-right'>
                    <div>Days displayed: {days}</div>
                    <button onClick={deductDays}>-</button>
                    <button onClick={addDays}>+</button>
                    <div> {location ? `${location[0].name}, ${location[0].country}` : ""}</div>
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

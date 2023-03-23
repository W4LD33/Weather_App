import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"


export default function TempChart(){
    const [categories, setCategories] = useState([])
    const [series, setSeries] = useState([])
    
    useEffect(() => {
        getChart();
    }, [])
    
    const getChart = async () => {
        const res = await fetch('https://api.oceandrivers.com/v1.0/getWeatherDisplay/ikauna17/?period=latestday');
        const data = await res.json();
        const categories = Object.keys(data.TEMPERATURE).map((key) => parseInt(key));
        const series = Object.values(data.TEMPERATURE);
        
        setCategories({
            xaxis: {
                categories: categories
            },
        });
        setSeries([
            {
                name: 'Temp°',
                data: series
            },
        ]);
    };

    return (
        <Chart 
        options={{xaxis: {categories: categories},}}
        series={series}
        type="line"
        width="1200"
        height="400"
        />
    )
}





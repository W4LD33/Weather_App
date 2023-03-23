import React, {useEffect, useState} from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import 'highcharts/css/highcharts.css';

export default function Chart(){
    const [chart, setChart] = useState({})

    useEffect(() => {
        async function fetchData(){
            const res = await fetch('https://api.oceandrivers.com/v1.0/getWeatherDisplay/ikauna17/?period=latestday');
            const data = await res.json();
            const categories = data.TEMPERATURE.map(e => e.time);
            const series = [{name: 'Temp°', data: data.TEMPERATURE.map(e => e.value)}];
            setChart({ categories, series });
        }
        fetchData();
    }, [])

    const options = 
    {
        title: {text: '24H',},
        xAxis: {categories: chart.categories},
        series: chart.series
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options}/>
        </div>
    )
}
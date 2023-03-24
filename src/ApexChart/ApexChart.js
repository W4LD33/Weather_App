import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"


export default function TempChart(props){
    
    return (
        <Chart 
        options={{xaxis: {categories: props.timeArray},}}
        series={props.tempArray}
        type="line"
        width="100%"
        height="400"
        />
    )
}





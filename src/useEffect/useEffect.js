import React, { useEffect } from "react"

export default function Effect(){

    const [count, setCount] = React.useState(0)

    React.useEffect(function(){
        console.log(count);
    },[count])

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(prev => prev + 1)}>+</button>
        </div>
    )
}
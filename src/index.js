import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Form from './Form/Form';
import Login from './Login/Login';
import Effect from './useEffect/useEffect';
import Fetch from './Fetch/Fetch';
import Chart from './Chart/Chart';
import TempChart from './ApexChart/ApexChart';


function Hooks(){
  const [hour, setHour] = useState(0)
  return null
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Fetch />
      <TempChart />
  </React.StrictMode>
);


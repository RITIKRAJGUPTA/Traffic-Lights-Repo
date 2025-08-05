import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const lights = ['North', 'East', 'South', 'West'];

function App() {
  const [traffic, setTraffic] = useState({ direction: 'North', color: 'red', secondsLeft: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('http://localhost:5000/traffic-status')
        .then(res => setTraffic(res.data))
        .catch(err => console.error(err));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isActive = (dir, color) => {
    if (dir === traffic.direction && color === traffic.color) return true;
    if (dir !== traffic.direction && color === 'red') return true; // Others always red
    return false;
  };

  const getOpacity = (active) => active ? 1 : 0.2;

  const getLightBox = (dir, color) => {
    let bgClass = '';
    if (color === 'red') bgClass = 'bg-danger';
    if (color === 'yellow') bgClass = 'bg-warning';
    if (color === 'green') bgClass = 'bg-success';

    return (
      <div
        className={`rounded-circle ${bgClass}`}
        style={{
          width: '30px',
          height: '30px',
          margin: '5px auto',
          opacity: getOpacity(isActive(dir, color)),
          border: '1px solid black'
        }}
      />
    );
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">🚦 Traffic Light Controller</h1>
      <div className="row">
        {lights.map((dir, index) => (
          <div key={index} className="col">
            <h4>{dir}</h4>
            <div className="d-flex flex-column align-items-center">
              {getLightBox(dir, 'red')}
              {getLightBox(dir, 'yellow')}
              {getLightBox(dir, 'green')}
            </div>
            <div className="mt-2 fw-bold">
              {dir === traffic.direction
                ? `${traffic.color.toUpperCase()} (${traffic.secondsLeft}s)`
                : 'RED'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

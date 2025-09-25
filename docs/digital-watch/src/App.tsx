import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1>Digital Watch</h1>
      <div className="overlay">
        <div className="card">
          <p className="date">
            {time.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })} <br />
          </p>
          <p className="time">
            {time.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </>
  )
}


export default App

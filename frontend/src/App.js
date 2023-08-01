import "./App.css";
import { useEffect, useState } from "react";
import fetchFromAPI from "./utils/fetch";
import stopwatchCalc from "./utils/stopwatchCalc";

function App() {
  // TODO: refactor into useReducer
  const [serverTime, setServerTime] = useState(null);
  const [timeDifference, setTimeDifference] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [hh, mm, ss] = stopwatchCalc(timeDifference);

  console.log(hh, mm, ss);

  useEffect(() => {
    // TODO: update to a more elegant solution like React Query
    async function fetchData(endpoint) {
      setIsLoading(true);
      const data = await fetchFromAPI(endpoint);
      if (endpoint === "time") {
        setServerTime(data.properties.epoch.value);
      }
      if (endpoint === "metrics") {
        setMetrics(data);
      }
      setIsLoading(false);
    }
    fetchData("time");
    fetchData("metrics");
    setTimeDifference(Math.round(Date.now() / 1000 - serverTime));

    const fetchInterval = setInterval(() => {
      fetchData("time");
      fetchData("metrics");
    }, 5000);

    const timeDifferenceInterval = setInterval(
      () => setTimeDifference(Math.round(Date.now() / 1000 - serverTime)),
      1000,
    );

    return () => {
      clearInterval(fetchInterval);
      clearInterval(timeDifferenceInterval);
    };
  }, [serverTime]);

  // useEffect(() => {
  //   setTimeDifference(Math.round(Date.now() / 1000 - serverTime));
  // }, [serverTime]);

  // console.log(Date.now() - timeDifference);

  return (
    <main className="app">
      <section id="time" className="section-wrapper">
        {isLoading ? (
          <p>LOADING... </p>
        ) : (
          <span>
            Server time (epoch seconds):{" "}
            {serverTime ? serverTime : <div className="skeleton-placeholder" />}
          </span>
        )}
        <br />
        <span>
          Time difference between client and server (HH:mm:ss):{" "}
          {serverTime ? (
            `${hh}:${mm}:${ss}`
          ) : (
            <div className="skeleton-placeholder" />
          )}
        </span>
      </section>
      <section id="metrics" className="metrics section-wrapper">
        <pre>{metrics}</pre>
      </section>
    </main>
  );
}

export default App;

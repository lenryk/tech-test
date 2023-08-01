import "./App.css";
import { useEffect, useState } from "react";
import fetchFromAPI from "./utils/fetch";
import stopwatchCalc from "./utils/stopwatchCalc/stopwatchCalc";
import Section from "./components/Section";

function App() {
  // TODO: refactor into useReducer
  const [serverTime, setServerTime] = useState(null);
  const [timeDifference, setTimeDifference] = useState(0);
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hh, mm, ss] = stopwatchCalc(timeDifference);

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

    const fetchInterval = setInterval(() => {
      fetchData("time");
      fetchData("metrics");
    }, 5000);

    // make this timeout lower (500) to render a 0 on the stopwatch view
    const timeDifferenceInterval = setInterval(
      () => setTimeDifference(Math.trunc(Date.now() / 1000 - serverTime)),
      1000,
    );

    return () => {
      clearInterval(fetchInterval);
      clearInterval(timeDifferenceInterval);
    };
  }, [serverTime]);

  return (
    <main className="app">
      <Section name="time" isLoading={isLoading}>
        <p>Server time (epoch seconds): {serverTime}</p>
        <p>
          Time difference between client and server (HH:mm:ss):{" "}
          {`${hh}:${mm}:${ss}`}
        </p>
      </Section>
      <Section name="metrics" isLoading={isLoading}>
        <pre>{metrics}</pre>
      </Section>
    </main>
  );
}

export default App;

import "./App.css";
import { useLayoutEffect, useState } from "react";
import fetchFromAPI from "./utils/fetch";
import stopwatchCalc from "./utils/stopwatchCalc/stopwatchCalc";
import Section from "./components/Section";
import useInterval from "./utils/useInterval";

function App() {
  // TODO: refactor into useReducer
  const [serverTime, setServerTime] = useState(null);
  const [timeDifference, setTimeDifference] = useState(0);
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hh, mm, ss] = stopwatchCalc(timeDifference);

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

  useLayoutEffect(() => {
    fetchData("time");
    fetchData("metrics");
  }, []);

  useInterval(() => {
    fetchData("time");
    fetchData("metrics");
  }, 30000);

  useInterval(() => {
    setTimeDifference(Math.trunc(Date.now() / 1000 - serverTime));
  }, 1000);

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

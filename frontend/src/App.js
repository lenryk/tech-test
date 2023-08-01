import "./App.css";
import { useState } from "react";
import fetchFromAPI from "./utils/fetch";

function App() {
  const [serverTime, setServerTime] = useState();

  // TODO: update to a more elegant solution like React Query
  fetchFromAPI("time").then((data) =>
    setServerTime(data.properties.epoch.value),
  );

  return (
    <main className="app">
      <section id="time" className="section-wrapper">
        Server time: {serverTime}
        <br />
        Time difference between client and server:
      </section>
      <section id="metrics" className="metrics section-wrapper">
        <pre>metrics</pre>
      </section>
    </main>
  );
}

export default App;

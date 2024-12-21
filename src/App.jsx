import React from "react";
import WeatherBoxes from "./components/WeatherBoxes";
import MainChart from "./components/Charts";
// import Charts from "./components/Charts";

function App() {
  return (
    <div
      className="bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))]
from-slate-800
via-slate-950
to-slate-900 w-full h-screen"
    >
      <WeatherBoxes />
      {/* <MainChart /> */}
    </div>
  );
}

export default App;

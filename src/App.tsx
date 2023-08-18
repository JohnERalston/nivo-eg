import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { MyResponsiveBar } from "./components/MyResponsiveBar";
import { barData } from "./components/barData";
import { MyResponsiveLine } from "./components/line/MyLineChart";

/*
https://github.com/plouc/nivo/issues/603
*/

function App() {
  const [count, setCount] = useState(0);
  const items: string[] = [];

  for (let i = 0; i < count; i++) {
    items.push(crypto.randomUUID());
  }

  return (
    <div className="App">
      {items.map((item) => (
        <h5 key={item}>{item}</h5>
      ))}

      <button onClick={() => setCount((c) => c + 1)}>Add Content Here</button>
      <MyResponsiveLine />
      {/* <hr /> */}
      {/* <MyResponsiveBar data={barData} /> */}
    </div>
  );
}

export default App;

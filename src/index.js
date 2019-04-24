import React from "react";
import ReactDOM from "react-dom";
import GiftCardsContainer from "./GiftCardsContainer";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <GiftCardsContainer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

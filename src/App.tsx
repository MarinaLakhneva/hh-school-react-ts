import React from 'react';
import "./App.css"
import Inputs from "./Components/Inputs";
import Result from "./Components/Result";

export default function App() {
  return (
    <div className="App">
      <Result />
      <Inputs />
    </div>
  );
}

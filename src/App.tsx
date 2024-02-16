import React from 'react';
import "./App.css"
import Inputs from "./components/Inputs";
import Result from "./components/Result";

export default function App() {
  return (
    <div className="App">
      <Result />
      <Inputs />
    </div>
  );
}

import React, {useState} from 'react';
import "./App.css"
import {I_inputs} from "./Interface";
import Inputs from "./Components/Inputs";
import Result from "./Components/Result";

export default function App() {
  const [inputs, setInputs] = useState<I_inputs>({
    user: localStorage.getItem("user") || "",
    repo: localStorage.getItem("repo") || "",
    rev: '',
    blackContributors: localStorage.getItem("blackContributors") || "",
  });
  
  return (
    <div className="App">
      <Result inputs={inputs} setInputs={setInputs}/>
      <Inputs inputs={inputs} setInputs={setInputs}/>
    </div>
  );
}

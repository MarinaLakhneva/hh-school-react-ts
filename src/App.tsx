import React, {useEffect, useState} from 'react';
import "./App.css"
import {I_inputs} from "./Interface";
import Inputs from "./Components/Inputs";
import Result from "./Components/Result";

export default function App() {
  const [inputs, setInputs] = useState<I_inputs>({
    user: '',
    repo: '',
    rev: '',
    blackContributors: '',
  });
  
  const updateInputs = (name: string, value: string) => {
    setInputs(inputs => {
      return {
        ...inputs,
        [name]: value,
      }
    });
  }
  
  useEffect(() => {
    updateInputs("user", localStorage.getItem("user")!);
    updateInputs("repo", localStorage.getItem("repo")!);
    updateInputs("blackContributors", localStorage.getItem("blackContributors")!);
  }, []);
  
  return (
    <div className="App">
      <Result inputs={inputs} setInputs={setInputs}/>
      <Inputs inputs={inputs} setInputs={setInputs}/>
    </div>
  );
}

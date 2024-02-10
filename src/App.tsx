import React, {createRef, useRef, useState} from 'react';
import "./App.css"
import Field from "./Field";
import {GetData} from './request';

const Inputs = [
  {
    id: "login",
    key: 1,
    placeholder: "login"
  },
  {
    id: "repos",
    key: 2,
    placeholder: "repos",
    
  },
  {
    id: "contrib",
    key: 3,
    placeholder: "blacklist"
  },
]

export default function App() {
  const [look, setLook] = useState(true);
  
  return (
    <div className="App">
      <div className="result">
        <p>Your reviewer:</p>
        <p id="rev"></p>
      </div>
      <div className="form">
        <button className="settings" onClick={() =>{setLook(!look)}}>Settings</button>
        {look &&
          <div className="look">
            <div id="functional">
              {Inputs.map(({id,key, placeholder }) => {
                return (
                  <Field id={id} placeholder={placeholder} key={key}/>
                )
              })}
            </div>
            <button className="search" onClick={GetData}>search</button>
          </div>}
      </div>
    </div>
  );
}

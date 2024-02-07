import React from 'react';
import { MouseEvent } from 'react';
import "./App.css"
import {GetData} from './request';


export default function App() {
  const handleClick = (event: MouseEvent) => {
    let form = document.getElementById('functional')
    if(form){
      if(form.style.display === 'none'){
        form.style.display = 'flex'
      }
      else {
        form.style.display = 'none'
      }
    }
  };
  return (
    <div className="App">
      <button className="settings" onClick={handleClick}>Settings</button>
      <div id="functional">
        <input id="login" placeholder="login"/>
        <input id="repos" placeholder="repo"/>
        <input id="contrib" placeholder="blacklist"/>
        <button className="search" onClick={GetData}>search</button>
      </div>
    </div>
  );
}

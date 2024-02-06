import React from 'react';
import { MouseEvent } from 'react';
import "./App.css"


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
        <input placeholder="login"/>
        <input placeholder="repo"/>
        <input placeholder="blacklist"/>
        <button className="search">search</button>
      </div>
    </div>
  );
}

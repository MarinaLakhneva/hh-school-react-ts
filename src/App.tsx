import React, {useState} from 'react';
import "./App.css"
// import Field from "./Field";
import {GetData} from './request';

// const Inputs = [
//   {
//     id: "login",
//     key: 1,
//     placeholder: "login"
//   },
//   {
//     id: "repos",
//     key: 2,
//     placeholder: "repos"
//   },
//   {
//     id: "contrib",
//     key: 3,
//     placeholder: "blacklist"
//   },
// ]
export default function App() {
  const [look, setLook] = useState(true);
  
  const [login, setLogin] = useState('');
  const [repo, setRepo] = useState('');
  const [blackRev, setBlackRev] = useState('');
  
  
  return (
    <div className="App">
      <div className="form">
        <button className="settings" onClick={() =>{setLook(!look)}}>Settings</button>
        {look && <div className="look">
            <div id="functional">
              {/*{Inputs.map(({id,key, placeholder }) => {*/}
              {/*  return (*/}
              {/*    <Field id={id} key={key} placeholder={placeholder} />*/}
              {/*  )*/}
              {/*})}*/}
              <input
                id="login"
                placeholder="login"
                key={1}
                value={login}
                onChange={(e) => setLogin(e.target.value)}/>
              <input
                id="repo"
                placeholder="repo"
                key={2}
                value={repo}
                onChange={(e) => setRepo(e.target.value)}/>
              <input
                id="blackRev"
                placeholder="blackRev"
                key={3}
                value={blackRev}
                onChange={(e) => setBlackRev(e.target.value)}
              />
            </div>
            <button className="search" onClick={GetData(login, repo, blackRev)}>search</button>
          </div>}
      </div>
    </div>
  );
}

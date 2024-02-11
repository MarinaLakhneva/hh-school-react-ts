import React, {useState} from 'react';
import "./App.css"

const URL_ = 'https://api.github.com/repos/';

const randomize = (min: number, max: number): number =>{
  return min + Math.floor((max-min+1)*Math.random())
}

export default function App() {
  const [look, setLook] = useState(true);
  
  const [user, setLogin] = useState('');
  const [repos, setRepo] = useState('');
  const [rev, setBlackRev] = useState('');
  
  const [contributor, setRev] = useState('');
  function GetData()  {
    let URL = URL_+user+'/'+repos+'/contributors';
    
    fetch(URL)
      .then(
        (response) => {
          if ( response.status !== 200 ) {
            console.log( 'Looks like there was a problem. Status Code: ' +
              response.status );
            return;
          }
          response.json().then((data) =>{
            let size = data.length;
            let white = [];
            let black = []
            
            for (let i = 0; i < size; i++){
              black[i] = data[i].login;
            }
            white = black.filter(val => val !== rev);
            
            const inputs = { user, repos, rev };
            if (localStorage.getItem('inputs') === null){
              localStorage.setItem('inputs', JSON.stringify(inputs));
            }else {
              localStorage.getItem('inputs');
            }
            
            let n = randomize(0, size-1-1);
            setRev(white[n]);
            return;
          })
        })
      .catch((err) => {
        console.log(err)
      })
  }
  
  return (
    <div className="App">
      <div className="result">
        <div className="info">
          <p className="title">User:</p>
          <p>{user}</p>
        </div>
        <div className="info">
          <p className="title">Rev:</p>
          <p>{contributor}</p>
        </div>
      </div>
      <div className="form">
        <button className="settings" onClick={() =>{setLook(!look)}}>Settings</button>
        {look && <div className="look">
          <div id="functional">
            <input
              id="login"
              placeholder="login"
              key={1}
              value={user}
              onChange={(e) => setLogin(e.target.value)}/>
            <input
              id="repo"
              placeholder="repo"
              key={2}
              value={repos}
              onChange={(e) => setRepo(e.target.value)}/>
            <input
              id="blackRev"
              placeholder="blackRev"
              key={3}
              value={rev}
              onChange={(e) => setBlackRev(e.target.value)}
            />
          </div>
          <button className="search" onClick={GetData}>SEARCH</button>
        </div>}
      </div>
    </div>
  );
}
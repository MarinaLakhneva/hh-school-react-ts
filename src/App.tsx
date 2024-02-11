import React, {useState} from 'react';
import "./App.css"

const URL_ = 'https://api.github.com/repos/';

const randomize = (min: number, max: number): number =>{
  return min + Math.floor((max-min+1)*Math.random())
}

function Store(key: string, param: string)  {
  if (localStorage.getItem(key) === null){
    localStorage.setItem(key, param);
  }
}

export default function App() {
  const [look, setLook] = useState(true);
  

  const [user, setUser] = useState ( () => {
    const savedItem = localStorage.getItem("user");
    return savedItem || "";
  });
  const [repo, setRepo] = useState ( () => {
    const savedItem = localStorage.getItem("repo");
    return savedItem || "";
  });
  const [rev, setBlackRev] = useState ( () => {
    const savedItem = localStorage.getItem("rev");
    return savedItem || "";
  });
  
  const [contributor, setContributor] = useState('');
  
  let blackList: string[] = []
  function GetData()  {
    let URL = URL_+user+'/'+repo+'/contributors';
    
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
            blackList = rev.split(', ');
            white = black.filter(val =>  !blackList.includes(val));
            
            Store('user', user);
            Store('repo', repo);
            Store('rev', rev);

            let n = randomize(0, size-1-blackList.length);
            
            setContributor(white[n]);
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
              onChange={(e) => setUser(e.target.value)}/>
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
              value={rev}
              onChange={(e) => setBlackRev(e.target.value)}
            />
          </div>
          <button className="search" onClick={GetData}>search</button>
        </div>}
      </div>
    </div>
  );
}
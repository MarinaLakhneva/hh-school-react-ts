import React, { useState } from 'react';
import {Props} from "../Interface";
const URL_ = 'https://api.github.com/repos/';
function Store(key: string, param: string)  {
	if (localStorage.getItem(key) === null){
		localStorage.setItem(key, param);
	}
}
const randomize = (min: number, max: number): number =>{
	return min + Math.floor((max-min+1)*Math.random())
}
const Inputs: React.FC<Props> = ({inputs, setInputs}) => {
	const [visible, setVisible] = useState(true);
	
	const [user, setUser] = useState ( () => {
		const savedItem = localStorage.getItem("user");
		return savedItem ||  "";
	});
	const [repo, setRepo] = useState ( () => {
		const savedItem = localStorage.getItem("repo");
		return savedItem ||  "";
	});
	const [blackContributors, setBlackContributors] = useState ( () => {
		const savedItem = localStorage.getItem("blackContributors");
		return savedItem || "";
	});
	
	const updateInputs = (name: string, value: string) => {
		setInputs(inputs => {
			return {
				...inputs,
				[name]: value,
			}
		});
	}
	
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
						blackList = blackContributors.split(', ');
						white = black.filter(val =>  !blackList.includes(val));
						
						const inputs = { user, repo, blackContributors };
	
						if (localStorage.getItem('inputs') === null){
							localStorage.setItem('inputs', JSON.stringify(inputs));
						}else {
							localStorage.getItem('inputs');
						}
						
						Store('user', user);
						Store('repo', repo);
						Store('blackContributors', blackContributors);
						
						let n = randomize(0, size-1-blackList.length);
						updateInputs("rev", white[n]);
						return;
					})
				})
			.catch((err) => {
				console.log(err )
			})
	}
	
	return (
		<div className="form">
			<button className="settings" onClick={() =>{setVisible(!visible)}}>Settings</button>
			{visible && <div className="visible">
				<div id="functional">
					<input
						id="user"
						placeholder="login"
						key={1}
						value={user}
						onChange={(e) => {
							setUser(e.target.value);
							updateInputs("user", e.target.value)}
					}/>
					<input
						id="repo"
						placeholder="repository"
						key={2}
						value={repo}
						onChange={(e) => {
							setRepo(e.target.value);
							updateInputs("repo", e.target.value)}
						}/>
					<input
						id="blacklist"
						placeholder="blacklist"
						key={3}
						value={blackContributors}
						onChange={(e) => {
							setBlackContributors(e.target.value);
							updateInputs("blackContributors", e.target.value)}
						}/>
				</div>
				<button className="search" onClick={GetData}>search</button>
			</div>}
		</div>
	);
}
export default Inputs

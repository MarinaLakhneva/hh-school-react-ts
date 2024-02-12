import React, { useState } from 'react';
import {Props} from "../Interface";

const URL_: string = 'https://api.github.com/repos/';

function store(key: string, param: string)  {
	if (localStorage.getItem(key) === null){
		localStorage.setItem(key, param);
	}
	else {
		if(localStorage.getItem(key) !== param){
			localStorage.setItem(key, param);
		}
	}
}
const randomize = (min: number, max: number): number =>{
	return min + Math.floor((max-min+1)*Math.random())
}


const Inputs: React.FC<Props> = ({setInputs}) => {
	const [visible, setVisible] = useState<boolean>(true);
	
	const [user, setUser] = useState<string>( () => {
		const savedItem = localStorage.getItem("user");
		return savedItem ||  "";
	});
	const [repo, setRepo] = useState<string>( () => {
		const savedItem = localStorage.getItem("repo");
		return savedItem ||  "";
	});
	const [blackContributors, setBlackContributors] = useState<string>( () => {
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
	
	function getData()  {
		let URL: string = URL_+user+'/'+repo+'/contributors';
		
		fetch(URL)
			.then(
				(response) => {
					if ( response.status !== 200 ) {
						console.log( 'Looks like there was a problem. Status Code: ' +
							response.status );
						return;
					}
					response.json().then((data) =>{
						let size: number = data.length;
						let black: string[] = [];
						
						for (let i: number = 0; i < size; i++){
							black[i] = data[i].login;
						}
						blackList = blackContributors.split(', ');
						let white: string[] = black.filter(val =>  !blackList.includes(val));
						
						store('user', user);
						store('repo', repo);
						store('blackContributors', blackContributors);
						
						let n: number = randomize(0, size-1-blackList.length);
						updateInputs("rev", white[n]);
						return;
					})
				})
			.catch((err) => {
				console.log(err)
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
				<button className="search" onClick={getData}>search</button>
			</div>}
		</div>
	);
}
export default Inputs
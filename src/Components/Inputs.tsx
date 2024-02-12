import React, { useState } from 'react';
import {Props} from "../Interface";

const URL_: string = 'https://api.github.com/repos/';

function store(key: string, param: string)  {
	if(localStorage.getItem(key) !== param){
		localStorage.setItem(key, param);
	}
}
const randomize = (min: number, max: number): number =>{
	return min + Math.floor((max-min+1)*Math.random())
}


const Inputs: React.FC<Props> = ({setInputs, inputs}) => {
	const [visible, setVisible] = useState<boolean>(true);
	
	let blackList: string[] = []
	
	const updateInputs = (name: string, value: string) => {
		setInputs(inputs => {
			return {
				...inputs,
				[name]: value,
			}
		});
	}
	
	function getData()  {
		let URL: string = URL_+inputs.user+'/'+inputs.repo+'/contributors';
		
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
						blackList = inputs.blackContributors.split(', ');
						let white: string[] = black.filter(val =>  !blackList.includes(val));
						console.log(white)
						store('user', inputs.user);
						store('repo', inputs.repo);
						store('blackContributors', inputs.blackContributors);
						
						if(blackList.length === 1){
							if(blackList[0] === ''){
								blackList.length = 0;
							}
						}
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
						value={inputs.user}
						onChange={(e) => {
							updateInputs("user", e.target.value)}
						}/>
					<input
						id="repo"
						placeholder="repository"
						key={2}
						value={inputs.repo}
						onChange={(e) => {
							updateInputs("repo", e.target.value)}
						}/>
					<input
						id="blacklist"
						placeholder="blacklist"
						key={3}
						value={inputs.blackContributors}
						onChange={(e) => {
							updateInputs("blackContributors", e.target.value)}
						}/>
				</div>
				<button className="search" onClick={getData}>search</button>
			</div>}
		</div>
	);
}
export default Inputs
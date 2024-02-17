import React, {useEffect} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {ActionTypes} from "../types/types";
import {useActions} from "../hooks/useActions";

const URL_: string = 'https://api.github.com/repos/';

function store(key: string, param: string)  {
	if(localStorage.getItem(key) !== param){
		localStorage.setItem(key, param);
	}
}
const randomize = (min: number, max: number): number =>{
	return min + Math.floor((max-min+1)*Math.random())
}


const Inputs: React.FC = () => {
	const dispatch = useDispatch();
	let {user, repo, blackContributors, visible} = useTypedSelector(state => state.user);
	const {fetchReviewer} = useActions()
	useEffect(() => {
		fetchReviewer();
	}, []);
	
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
						
						if(blackList.length === 1){
							if(blackList[0] === ''){
								blackList.length = 0;
							}
						}
						let n: number = randomize(0, size-1-blackList.length);
						dispatch({
							type: ActionTypes.INPUT_REV,
							payload: white[n]});
						return;
					})
				})
			.catch((err) => {
				console.log(err)
			})
	}
	
	return (
		<div className="form">
			<button className="settings" onClick={() =>{dispatch({type: ActionTypes.SET_VISIBLE, payload: !visible});}}>Settings</button>
			{visible && <div className="visible">
				<div id="functional">
					<input
						id="user"
						placeholder="login"
						key={1}
						value={user}
						onChange={(e) => {
							dispatch({
								type: ActionTypes.INPUT_USER,
								payload: e.target.value})}
					}/>
					<input
						id="repo"
						placeholder="repository"
						key={2}
						value={repo}
						onChange={(e) => {
							dispatch({
								type: ActionTypes.INPUT_REPO,
								payload: e.target.value})}
						}/>
					<input
						id="blacklist"
						placeholder="blacklist"
						key={3}
						value={blackContributors}
						onChange={(e) => {
							dispatch({
								type: ActionTypes.INPUT_BLACK,
								payload: e.target.value})}
						}/>
				</div>
				<button className="search" onClick={getData}>search</button>
			</div>}
		</div>
	);
}
export default Inputs

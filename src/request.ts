import {randomInt} from "crypto";

export {};
const URL_ = 'https://api.github.com/repos/';

const randomize = (min: number, max: number): number =>{
	return min + Math.floor((max-min+1)*Math.random())
}
export function GetData(){
	const login = document.getElementById('login') as HTMLInputElement;
	const repositories = document.getElementById('repos') as HTMLInputElement;
	const contrib = document.getElementById('contrib') as HTMLInputElement;
	
	const user = login?.value;
	const repos = repositories?.value;
	const rev = contrib?.value;
	let URL = URL_+user+'/'+repos+'/contributors';
	console.log(URL)
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
					let n = randomize(0, size-1);
					if(rev === data[n].login){
						console.log("OOOps... This reviewer is blacklisted!!!");
						return;
					}
					else {
						console.log(data[n].login);
						return;
					}
				})
			})
		.catch((err) => {
			console.log(err)
		})
}

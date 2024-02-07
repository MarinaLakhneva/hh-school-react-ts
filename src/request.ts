export {};
const URL_ = 'https://api.github.com/repos/';

const randomize = (min: number, max: number): number =>{
	return min + Math.floor((max-min+1)*Math.random())
}
export function GetData(){
	const login = document.getElementById('login') as HTMLInputElement;
	const repositories = document.getElementById('repos') as HTMLInputElement;
	const contrib = document.getElementById('contrib') as HTMLInputElement;
	
	let res = document.getElementById("rev") as HTMLInputElement;
	
	const user = login?.value;
	const repos = repositories?.value;
	const rev = contrib?.value;
	
	localStorage.setItem('login', user);
	localStorage.setItem('repos', repos);
	localStorage.setItem('blackrev', rev);
	
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
					let white = [];
					let black = []
					
					for (let i = 0; i < size; i++){
						black[i] = data[i].login;
					}
					white = black.filter(val => val !== rev);
					console.log("All reviewers:", black);
					console.log("Whitelist", white);
					console.log("Blacklist:", rev);
					
					let n = randomize(0, size-1-1);
					res.innerHTML = white[n];
					return;
				})
			})
		.catch((err) => {
			console.log(err)
		})
}

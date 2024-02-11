const URL_ = 'https://api.github.com/repos/';

const randomize = (min: number, max: number): number =>{
	return min + Math.floor((max-min+1)*Math.random())
}
export const GetData = (user: string, repos: string, rev: string) => () => {
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
					console.log("User:", user)
					console.log("All reviewers:", black);
					console.log("BlackList:", rev);
					
					const inputs = { user, repos, rev };
					if (localStorage.getItem('inputs') === null){
						localStorage.setItem('inputs', JSON.stringify(inputs));
					}else {
						localStorage.getItem('inputs');
					}
					
					let n = randomize(0, size-1-1);
					console.log("Reviewer:", white[n])
					return;
				})
			})
		.catch((err) => {
			console.log(err)
		})
}

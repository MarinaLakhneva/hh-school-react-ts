export interface State {
	user: string,
	repo: string,
	blackContributors: string,
	rev: string,
}

export enum ActionTypes {
	INPUT_USER = 'INPUT_USER',
	INPUT_REPO = 'INPUT_REPO',
	INPUT_BLACK = 'INPUT_BLACK',
	INPUT_REV = 'INPUT_REV',
}
interface userAction{
	type: ActionTypes.INPUT_USER;
	payload: string;
}

interface repoAction{
	type: ActionTypes.INPUT_REPO;
	payload: string;
}

interface blackAction{
	type: ActionTypes.INPUT_BLACK;
	payload: string;
}

interface revAction{
	type: ActionTypes.INPUT_REV;
	payload: string;
}

export type Action = userAction | repoAction | blackAction | revAction;

export interface State {
	user: string,
	repo: string,
	blackContributors: string,
	rev: string,
	visible: boolean
}

export enum ActionTypes {
	INPUT_USER = 'INPUT_USER',
	INPUT_REPO = 'INPUT_REPO',
	INPUT_BLACK = 'INPUT_BLACK',
	INPUT_REV = 'INPUT_REV',
	SET_VISIBLE = 'SET_VISIBLE'
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

interface visibleAction{
	type: ActionTypes.SET_VISIBLE;
	payload: boolean;
}
export type Action = userAction | repoAction | blackAction | revAction | visibleAction;

import {Action, ActionTypes, State} from '../../types/types'

const initialState: State = {
	user: '',
	repo: '',
	blackContributors: '',
	rev: '',
}

export const Reducer = (state = initialState, action: Action): State => {
	switch (action.type){
		case ActionTypes.INPUT_USER:
			return {
				...state,
				user: action.payload};
		case ActionTypes.INPUT_REPO:
			return {
				...state,
				repo: action.payload};
		case ActionTypes.INPUT_BLACK:
			return {
				...state,
				blackContributors: action.payload};
		case ActionTypes.INPUT_REV:
			return {
				...state,
				rev: action.payload};
		default:
			return state;
	}
}

import {Dispatch} from "redux";
import {Action, ActionTypes} from "../../types/types";


export const fetchReviewer = () => {
	return async (dispatch: Dispatch<Action>)=> {
		try {
			dispatch({
				type: ActionTypes.INPUT_USER,
				payload: localStorage.getItem("user")!});
			dispatch({
				type: ActionTypes.INPUT_REPO,
				payload: localStorage.getItem("repo")!});
			dispatch({
				type: ActionTypes.INPUT_BLACK,
				payload: localStorage.getItem("blackContributors")!});
		} catch (e) {
			console.log("The problem is in fetchReviewer!")
		}
	}
}

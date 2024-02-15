import {Dispatch} from "redux";
import {Action, ActionTypes} from "../../types/types";

export const fetchReviewer = () => {
	return async (dispatch: Dispatch<Action>)=> {
		try {
			dispatch({
				type: ActionTypes.INPUT_USER,
				payload: localStorage.getItem("user")!
			});
		} catch (e) {

		}
	}
}

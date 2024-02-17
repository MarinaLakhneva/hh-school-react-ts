import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import ActionCreators from '../store/action-creater/'

//хотела вызывать в useEffect, не получилось, выдает ошибку
export const useActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(ActionCreators, dispatch);
}

import React from "react";
import {useTypedSelector} from "../hooks/useTypedSelector";


const Result: React.FC = () =>{
	const {user, rev} = useTypedSelector(state => state.user)

	return(
		<div className="result">
			<div className="info">
				<p className="title">User:</p>
				<p>{user}</p>
			</div>
			<div className="info">
				<p className="title">Reviewer:</p>
				<p>{rev}</p>
			</div>
		</div>
	)
}
export default Result

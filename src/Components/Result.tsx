import React from "react";
import {Props} from "../Interface";

const Result: React.FC<Props> = ({inputs, setInputs}) =>{
	return(
		<div className="result">
			<div className="info">
				<p className="title">User:</p>
				<p>{inputs.user}</p>
			</div>
			<div className="info">
				<p className="title">Reviewer:</p>
				<p>{inputs.rev}</p>
			</div>
		</div>
	)
}
export default Result

import React from "react";

export interface I_inputs {
	user: string,
	repo: string,
	blackContributors: string,
	rev: string,
}

export interface Props {
	inputs: I_inputs,
	setInputs: React.Dispatch<React.SetStateAction<I_inputs>>,
}

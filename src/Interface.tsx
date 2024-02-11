export interface I_inputs {
	user: string,
	repo: string,
	rev: string,
	blackContributors: string
}

export interface Props {
	inputs: I_inputs,
	setInputs: React.Dispatch<React.SetStateAction<I_inputs>>,
}

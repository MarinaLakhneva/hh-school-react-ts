import React, {PropsWithChildren} from "react";

const Field = ({
	id,
	placeholder
}: PropsWithChildren <{id: string, placeholder: string}>) => {
	return(
			<input id={id} placeholder={placeholder} key={id} />
	)
}
export default Field;
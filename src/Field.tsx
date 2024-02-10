import React, {PropsWithChildren, useState} from "react";

const Field = ({
	id,
	placeholder
}: PropsWithChildren <{id: string, placeholder: string}>) => {
	return(
			<input id={id} placeholder={placeholder}/>
	)
}
export default Field;
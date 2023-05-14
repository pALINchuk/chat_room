import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import styles from "./ErrorMessage.module.sass"


type OwnProps = {
	message: string,
	status: string
}

export const ErrorMessage: FunctionComponent<OwnProps> = (props: OwnProps) =>{
	const {message,status}:{message:string,status:string} = props;
	const [isVisible, setIsVisible] : [boolean,any] = useState(false);
	const errorMessageRef : React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

	const toggleMessageVisibility = (message: string, visible: boolean) : void =>{

		if(!errorMessageRef.current)
			return
		if(!isVisible){
			errorMessageRef.current.classList.add(styles.ErrorMessage__visible)
			errorMessageRef.current.classList.remove(styles.ErrorMessage__hidden)
			setIsVisible(true)
			return;
		}
		if(isVisible){
			errorMessageRef.current.classList.add(styles.ErrorMessage__hidden)
			errorMessageRef.current.classList.remove(styles.ErrorMessage__visible)
			setIsVisible(false)
			return;
		}
	}

	useEffect(()=>{
		if(!message && errorMessageRef.current){
			errorMessageRef.current.classList.add(styles.ErrorMessage__hidden)
			errorMessageRef.current.classList.remove(styles.ErrorMessage__visible)
			setIsVisible(false)
			return
		}
		toggleMessageVisibility(message, isVisible)
	},[message])

	const handleCloseClick = () : void =>{
		toggleMessageVisibility(message, isVisible)
	}

	return(
		<div className={styles.ErrorMessage} ref={errorMessageRef}>
			<span className={styles.ErrorMessage_close} onClick={handleCloseClick}>&#10006;</span>
			<h6 className={styles.ErrorMessage_header}>{status}: Something went wrong</h6>
			<p className={styles.ErrorMessage_message}>{message}</p>
		</div>
	)
}
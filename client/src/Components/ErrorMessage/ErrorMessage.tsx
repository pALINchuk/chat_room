import React, {useEffect, useRef, useState} from "react";
import styles from "./ErrorMessage.module.sass"


type PropsType = {
	message: string,
	status: number
}

export const ErrorMessage = (props: PropsType) =>{
	const {message,status}:{message:string,status:number} = props;
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
			errorMessageRef.current.style.display = "none"
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
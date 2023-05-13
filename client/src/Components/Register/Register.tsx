import React, {FunctionComponent, useRef} from 'react';
import styles from "./Register.module.sass"
import {updatePassword, updateUsername} from "../../redux/slices/registerSlice";
import {TypedDispatch, useDispatch, useSelector} from "../../hooks.ts";
import {ErrorMessage} from "../ErrorMessage";


export const Register: FunctionComponent = () => {


	const {username, password}: {username: string, password: string} = useSelector(state=>state.register)
	const {error, status}: {error: string, status: string} = useSelector(state=>state.register.registerReq)
	const dispatch: TypedDispatch = useDispatch()


	const passwordInputRef : React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
	const usernameInputRef : React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
	const showPasswordButton: React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null)
	const handleSubmit = (e:any) =>{
		e.preventDefault()
	}
	const handleUsernameInput = () =>{
		if(!usernameInputRef.current) return
		dispatch(updateUsername(usernameInputRef.current.value))
	}

	const handlePasswordInput = () =>{
		if(!passwordInputRef.current) return
		dispatch(updatePassword(passwordInputRef.current.value))
	}

	const handleShowPasswordClick = (): void =>{
		if (!passwordInputRef.current) return;
		if(passwordInputRef.current.type == "password"){
			passwordInputRef.current.type = "text"
		}else{
			passwordInputRef.current.type = "password"
		}

		if(!showPasswordButton.current) return;
		showPasswordButton.current.classList.toggle(styles.RegisterPage_Form_showPasswordBtn__focused)
	}

	return (
		<>
			<div className={styles.RegisterPage}>
				<form className={styles.RegisterPage_Form} onSubmit={handleSubmit}>
					<h1 className={styles.RegisterPage_Form_header}>Sign up</h1>

					<input
						type="text"
						id="usernameInput"
						className={styles.RegisterPage_Form_username}
						placeholder=" "
						ref={usernameInputRef}
						onInput={handleUsernameInput}
						value={username}
						pattern="[A-Za-z0-9]{1,20}"
						title="username should consist only of letters of english alphabet or numbers and can be at most 20 symbols long"
						required
					/>
					<label htmlFor="usernameInput" className={[styles.RegisterPage_Form_usernamePlaceholder, styles.RegisterPage_Form_inputPlaceholder].join(' ')}>
						username
					</label>

					<input
						type="password"
						id="passwordInput"
						className={styles.RegisterPage_Form_password}
						placeholder=" "
						ref={passwordInputRef}
						onInput={handlePasswordInput}
						value={password}
						pattern="[a-zA-Z0-9]{6,50}"
						title="password should consist only of letters of english alphabet or numbers and must be at least 6 symbols long"
						required
					/>
					<label htmlFor="passwordInput" className={`${styles.RegisterPage_Form_passwordPlaceholder} ${styles.RegisterPage_Form_inputPlaceholder}`}>password</label>
					<button className={styles.RegisterPage_Form_showPasswordBtn} onClick={handleShowPasswordClick} ref={showPasswordButton}>
						👁
					</button>
					<button type="submit" className={styles.RegisterPage_Form_submitBtn}>
						Sign up
					</button>
				</form>
			</div>
			<ErrorMessage message={error} status={status}/>
		</>
	);
};

import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import styles from "./Login.module.sass"
import {Link, useNavigate} from "react-router-dom";
import {clearState, updatePassword, updateUsername} from "../../redux/slices/loginSlice.ts";
import {TypedDispatch, useDispatch, useSelector} from "../../hooks.ts";
import {ErrorMessage} from "../ErrorMessage";
import {useMutation} from "@apollo/client";
import {LOGIN_MUTATION} from "../../queries/queries"
import {updateIsAuth, updateUserId} from "../../redux/slices/globalSlice.ts";


export const Login: FunctionComponent = () => {

	const [login, {data, loading, error, reset}] = useMutation(LOGIN_MUTATION)
	const {username, password}: {username: string, password: string} = useSelector(state=>state.login)
	const dispatch : TypedDispatch = useDispatch();
	const navigate = useNavigate();


	const passwordInputRef : React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
	const usernameInputRef : React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
	const showPasswordButton: React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null)
	const handleSubmit = (e:any) =>{
		e.preventDefault()
		login({
			variables:{
				username: username,
				password: password
			}
		})
			.then((response)=>{
				dispatch(updateIsAuth(true))
				return response

		}).then((response)=>{
			dispatch(updateUserId(response.data?.login?.id))
			navigate('/')
		})
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
		showPasswordButton.current.classList.toggle(styles.LoginPage_Form_showPasswordBtn__focused)
	}




	useEffect(() => {
		return ():void=>{
			dispatch(clearState())
		}
	}, [])


	return (
		<>
			<div className={styles.LoginPage}>
				<form className={styles.LoginPage_Form} onSubmit={handleSubmit}>
					<h1 className={styles.LoginPage_Form_header}>Sign in</h1>

					<input
						type="text"
						id="usernameInput"
						className={styles.LoginPage_Form_username}
						placeholder=" "
						ref={usernameInputRef}
						onInput={handleUsernameInput}
						value={username}
						pattern="[A-Za-z0-9_]{1,20}"
						title="username should consist only of letters of english alphabet or numbers and can be at most 20 symbols long"
						autoComplete="on"
						required
					/>
					<label htmlFor="usernameInput" className={[styles.LoginPage_Form_usernamePlaceholder, styles.LoginPage_Form_inputPlaceholder].join(' ')}>
						username
					</label>

					<input
						type="password"
						id="passwordInput"
						className={styles.LoginPage_Form_password}
						placeholder=" "
						ref={passwordInputRef}
						onInput={handlePasswordInput}
						value={password}
						pattern="[a-zA-Z0-9]{5,50}"
						title="password should consist only of letters of english alphabet or numbers and must be at least 6 symbols long"
						autoComplete="on"
						required
					/>
					<label htmlFor="passwordInput" className={`${styles.LoginPage_Form_passwordPlaceholder} ${styles.LoginPage_Form_inputPlaceholder}`}>password</label>
					<div className={styles.LoginPage_Form_NoAccountOption}>
						<p className={styles.LoginPage_Form_NoAccountOption_message}>
							No account?
						</p>
						<Link to="/register" className={styles.LoginPage_Form_NoAccountOption_link}>
							sign up!
						</Link>
					</div>
					<button type="button" className={styles.LoginPage_Form_showPasswordBtn} onClick={handleShowPasswordClick} ref={showPasswordButton}>
						👁
					</button>
					<button type="submit" className={styles.LoginPage_Form_submitBtn}>
						Sign in
					</button>
				</form>
			</div>
			{error?.message ? <ErrorMessage message={error?.message} status={""}/> : ''}
		</>
	);
};

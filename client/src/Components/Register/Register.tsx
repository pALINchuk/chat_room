import React, {FunctionComponent, useEffect, useRef} from 'react';
import styles from "./Register.module.sass"
import {clearState, updatePassword, updateUsername} from "../../redux/slices/registerSlice";
import {TypedDispatch, useDispatch, useSelector} from "../../hooks.ts";
import {ErrorMessage} from "../ErrorMessage";
import {useMutation} from "@apollo/client";
import {REGISTER_MUTATION} from "../../queries/queries.ts";
import {useNavigate} from "react-router-dom";


export const Register: FunctionComponent = () => {


	const {username, password}: {username: string, password: string} = useSelector(state=>state.register)
	const [register,{data,loading,error,reset}] = useMutation(REGISTER_MUTATION);
	const dispatch: TypedDispatch = useDispatch();
	const navigate = useNavigate();


	const passwordInputRef : React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
	const usernameInputRef : React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
	const showPasswordButton: React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null)
	const handleSubmit = (e:any) =>{
		e.preventDefault()
		register({
			variables:{
				username: username,
				password: password
			}
		}).then(()=>{
			navigate('/login')
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
		showPasswordButton.current.classList.toggle(styles.RegisterPage_Form_showPasswordBtn__focused)
	}

	useEffect(() => {
		return (): void=>{
			dispatch(clearState())
		}
	}, []);

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
						pattern="[A-Za-z0-9_]{1,20}"
						title="username should consist only of letters of english alphabet or numbers and can be at most 20 symbols long"
						autoComplete='off'
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
						autoComplete='off'
						required
					/>
					<label htmlFor="passwordInput" className={`${styles.RegisterPage_Form_passwordPlaceholder} ${styles.RegisterPage_Form_inputPlaceholder}`}>password</label>
					<button type="button" className={styles.RegisterPage_Form_showPasswordBtn} onClick={handleShowPasswordClick} ref={showPasswordButton}>
						👁
					</button>
					<button type="submit" className={styles.RegisterPage_Form_submitBtn}>
						Sign up
					</button>
				</form>
			</div>
			{error?.message ? <ErrorMessage message={error.message} status={status}/> : ''}
		</>
	);
};

import React, {FunctionComponent, useRef} from 'react';
import styles from "./Login.module.sass"


export const Login: FunctionComponent = () => {

	const passwordInputRef : React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
	const showPasswordButton: React.RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null)
	const handleSubmit = (e:any) =>{
		e.preventDefault()
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

	return (
		<>
			<div className={styles.LoginPage}>
				<form className={styles.LoginPage_Form} onSubmit={handleSubmit}>
					<h1 className={styles.LoginPage_Form_header}>Sign in</h1>

					<input type="text" id="usernameInput" className={styles.LoginPage_Form_username} placeholder=" "/>
					<label htmlFor="usernameInput" className={[styles.LoginPage_Form_usernamePlaceholder, styles.LoginPage_Form_inputPlaceholder].join(' ')}>username</label>

					<input type="password" id="passwordInput" className={styles.LoginPage_Form_password} placeholder=" " ref={passwordInputRef}/>
					<label htmlFor="passwordInput" className={`${styles.LoginPage_Form_passwordPlaceholder} ${styles.LoginPage_Form_inputPlaceholder}`}>password</label>

					<button className={styles.LoginPage_Form_showPasswordBtn} onClick={handleShowPasswordClick} ref={showPasswordButton}>👁</button>
					<button type="submit" className={styles.LoginPage_Form_submitBtn}>Sign in</button>
				</form>
			</div>
		</>
	);
};

import React, { FunctionComponent } from 'react';
import styles from "./Login.module.sass"


export const Login: FunctionComponent = () => {

	const handleSubmit = (e:any) =>{
		e.preventDefault()
	}

	return (
		<>
			<div className={styles.LoginPage}>
				<form className={styles.LoginPage_Form} onSubmit={handleSubmit}>
					<h1 className={styles.LoginPage_Form_header}>Sign in</h1>
					<input type="text" className={styles.LoginPage_Form_username} placeholder="provide username..."/>
					<input type="password" className={styles.LoginPage_Form_password} placeholder="provide password..."/>
					<button className={styles.LoginPage_Form_showPasswordBtn}>👁</button>
					<button type="submit" className={styles.LoginPage_Form_submitBtn}>Sign in</button>
				</form>
			</div>
		</>
	);
};

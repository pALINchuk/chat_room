import React from 'react';
import styles from "./ChatPage.module.sass"
import {ErrorMessage} from "../ErrorMessage";

export const ChatPage = () => {
	return (
		<>
			<div className={styles.ChatPage}>
				this is chatPage
			</div>
			<ErrorMessage message={""} status={""}/>
		</>
	)
}


import React from 'react';
import styles from "./ChatPage.module.sass"
import {ErrorMessage} from "../ErrorMessage";
import {Link} from "react-router-dom";
import {Message} from "../Message";



const dummyMessages = [
	{user: 'admin', text: 'lorem ipsum'},
	{user: 'mariana', text: 'DIE'},
	{user: 'admin', text: 'I am sorry'},
	{user: 'mariana', text: 'DIEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE'},
	{user: 'admin', text: 'lorem ipsum'},
	{user: 'mariana', text: 'DIE'},
	{user: 'admin', text: 'I am sorry'},
	{user: 'mariana', text: 'DIE'},
	{user: 'admin', text: 'lorem ipsum'},
	{user: 'mariana', text: 'DIE'},
	{user: 'admin', text: 'I am sorry'},
	{user: 'mariana', text: 'DIE'},
	{user: 'admin', text: 'lorem ipsum'},
	{user: 'mariana', text: 'DIE'},
	{user: 'admin', text: 'I am sorry'},
	{user: 'mariana', text: 'DIE'},
	{user: 'admin', text: 'lorem ipsum'},
	{user: 'mariana', text: 'DIE'},
	{user: 'admin', text: 'I am sorry'},
	{user: 'mariana', text: 'DIE'},

]

type MessageType = {
	user: string,
	text: string
}

const generateMessages = (messages:any, thisUser:string) =>{
	return messages.map((message: MessageType) =>(
		<Message author={message.user} text={message.text} isClient={message.user === thisUser}/>
	))
}


export const ChatPage = () => {

	const handleSubmit = (event:React.FormEvent<HTMLFormElement>) =>{
		event.preventDefault()
	}
	return (
		<>
			<div className={styles.ChatPage}>
				<div className={styles.Chat}>
					<header className={styles.Chat_Header}>
						<Link to="/" className={styles.Chat_Header_back}>
							↩
						</Link>
						<h1 className={styles.Chat_Header_title}>
							Chat
						</h1>
						<button className={styles.Chat_Header_logout}>Log Out</button>

					</header>
					<div className={styles.Chat_Feed}>
						<div className={styles.Chat_Feed_Messages}>
							{React.Children.toArray(generateMessages(dummyMessages, "admin"))}
						</div>
					</div>
					<form onSubmit={handleSubmit} className={styles.Chat_MessageForm}>
						<textarea className={styles.Chat_MessageForm_textInput}  placeholder="your message..."/>
						<button className={styles.Chat_MessageForm_sendButton}>▶</button>
					</form>

				</div>
			</div>
			{/*<ErrorMessage message={""} status={""}/>*/}
		</>
	)
}


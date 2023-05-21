import React, {useEffect, useRef, useState} from 'react';
import styles from "./ChatPage.module.sass"
import {ErrorMessage} from "../ErrorMessage";
import {Link} from "react-router-dom";
import {Message} from "../Message";
import {useMutation, useQuery, useSubscription} from "@apollo/client";
import {ADD_MESSAGE, MESSAGES_QUERY, NEW_MESSAGES_SUBSCRIBE} from "../../queries/queries.ts";
import {useDispatch, useSelector} from "../../hooks.ts";
import {setMessages, updateContentValue, updateMessages} from "../../redux/slices/chatSlice.ts";





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

	const {data, loading} = useSubscription(NEW_MESSAGES_SUBSCRIBE)
	const messageQuery = useQuery(MESSAGES_QUERY)
	const [addMessage, addMessageResult] = useMutation(ADD_MESSAGE)
	const {messages, contentValue} = useSelector(state=>state.chat)
	const {userId} = useSelector(state => state.global)
	const dispatch = useDispatch();

	const contentRef: React.RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>(null)

	const handleSubmit = (event:React.FormEvent<HTMLFormElement>) =>{
		event.preventDefault()
		addMessage({
			variables:{
				text: contentValue,
				post_date: Date.now().toString(),
				userId: userId
			}
		})

	}

	const handleContentInput = () =>{
		if(!contentRef.current) return;
		dispatch(updateContentValue(contentRef.current.value))
	}

	useEffect(()=>{
		if(!messageQuery.loading){
			console.log(messageQuery.data)
			dispatch(
				setMessages(
					messageQuery.data.messages.map((rawMessage:any)=>({
						text: rawMessage.text,
						post_date: rawMessage.text,
						userID: rawMessage.user.id,
						user: rawMessage.user.username
						})
					)
				)
			)

		}
	}, [messageQuery.loading])


	useEffect(() => {
		if(!loading){
			dispatch(updateMessages(
				{
					text: data.newMessage.text,
					post_on_date: data.newMessage.post_on_date,
					userID: data.newMessage.user.id,
					user: data.newMessage.user.username
				}
			))
			console.log(data)
		}
	}, [loading]);

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
							{messages.length ? React.Children.toArray(generateMessages(messages, "admin")) : <></>}
						</div>
					</div>
					<form onSubmit={handleSubmit} className={styles.Chat_MessageForm}>
						<textarea className={styles.Chat_MessageForm_textInput}  placeholder=" " ref={contentRef} value={contentValue} onInput={handleContentInput}/>
						<button className={styles.Chat_MessageForm_sendButton}>▶</button>
					</form>

				</div>
			</div>
			{/*<ErrorMessage message={""} status={""}/>*/}
		</>
	)
}


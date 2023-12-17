import React, {useEffect, useRef, useState} from 'react';
import styles from "./ChatPage.module.sass"
import {ErrorMessage} from "../ErrorMessage";
import {Link, useNavigate} from "react-router-dom";
import {Message} from "../Message";
import {useMutation, useQuery, useSubscription} from "@apollo/client";
import {ADD_MESSAGE, MESSAGES_QUERY, NEW_MESSAGES_SUBSCRIBE} from "../../queries/queries.ts";
import {useDispatch, useSelector} from "../../hooks.ts";
import {setMessages, updateContentValue, updateMessages} from "../../redux/slices/chatSlice.ts";
import {updateIsAuth, updateUserId} from "../../redux/slices/globalSlice.ts";


const LOG_OUT_URL = "http://localhost:3000/logout"


type MessageType = {
	user: string,
	text: string,
	post_on_date: string,
	userID: string
}

const generateMessages = (messages:any, thisUser:string) =>{
	return messages.map((message: MessageType) =>(
		<Message author={message.user} text={message.text} isClient={message.userID === thisUser}/>
	))
}


export const ChatPage = () => {

	const {data, loading, error} = useSubscription(NEW_MESSAGES_SUBSCRIBE, {
	})
	const messageQuery = useQuery(MESSAGES_QUERY)
	const [addMessage, addMessageResult] = useMutation(ADD_MESSAGE)
	const {messages, contentValue} = useSelector(state=>state.chat)
	const {userId} = useSelector(state => state.global)
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const contentRef: React.RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>(null)

	const pageRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)


	//handle theme

	useEffect(() => {

		const theme: string = JSON.parse(localStorage.getItem("theme") ?? 'dark')


		if(pageRef.current){
			if(theme=="light"){
				pageRef.current.classList.add(styles.light_mode)
				pageRef.current.classList.remove(styles.dark_mode)
			}else{
				pageRef.current.classList.add(styles.dark_mode)
				pageRef.current.classList.remove(styles.light_mode)
			}
		}
	}, [pageRef]);


	const handleSubmit = (event:React.FormEvent<HTMLFormElement>) =>{
		event.preventDefault()
		if(!contentValue.length){
			return
		}

		addMessage({
			variables:{
				text: contentValue,
				post_date: Date.now().toString(),
				userId: userId
			}
		}).then(()=>{
				dispatch(updateContentValue(''))
		})

	}

	const handleContentInput = () =>{
		if(!contentRef.current) return;
		dispatch(updateContentValue(contentRef.current.value))
	}

	const handleLogOut = () =>{
		fetch(LOG_OUT_URL, {credentials: "include", method: 'get'}).then(()=>{
			dispatch(updateIsAuth(false))
			dispatch(updateUserId(''))
			navigate('/login')
		}).catch(err=>console.log(err))

	}

	//setting client's messages once loaded

	useEffect(()=>{
		if(!messageQuery.loading){
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


	//updating client's messages

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
		}
	}, [data]);

	return (
		<>
			<div className={[styles.ChatPage, styles.dark_mode].join(' ')} ref={pageRef}>
				<div className={styles.Chat}>
					<header className={styles.Chat_Header}>
						<Link to="/" className={styles.Chat_Header_back}>
							<svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512">{"<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->"}<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
						</Link>
						<h1 className={styles.Chat_Header_title}>
							Chat
						</h1>
						<button className={styles.Chat_Header_logout} onClick={handleLogOut}>
							<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">{"<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->"}<path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>
						</button>

					</header>
					<div className={styles.Chat_Feed}>
						<div className={styles.Chat_Feed_Messages}>
							{messages.length ? React.Children.toArray(generateMessages(messages, userId)) : <></>}
						</div>
					</div>
					<form onSubmit={handleSubmit} className={styles.Chat_MessageForm}>
						<textarea className={styles.Chat_MessageForm_textInput}  placeholder="new message..." ref={contentRef} value={contentValue} onInput={handleContentInput}/>
						<button className={styles.Chat_MessageForm_sendButton}>
							<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">{"<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->"}<path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/></svg>
						</button>
					</form>

				</div>
			</div>
			{/*<ErrorMessage message={""} status={""}/>*/}
		</>
	)
}


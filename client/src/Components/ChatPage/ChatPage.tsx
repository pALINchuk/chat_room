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


	useEffect(() => {

		const theme = localStorage.getItem("theme")

		if(pageRef.current){
			if(theme=='"light"'){
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
	}, [data]);

	return (
		<>
			<div className={[styles.ChatPage, styles.dark_mode].join(' ')} ref={pageRef}>
				<div className={styles.Chat}>
					<header className={styles.Chat_Header}>
						<Link to="/" className={styles.Chat_Header_back}>
							↩
						</Link>
						<h1 className={styles.Chat_Header_title}>
							Chat
						</h1>
						<button className={styles.Chat_Header_logout} onClick={handleLogOut}>Log Out</button>

					</header>
					<div className={styles.Chat_Feed}>
						<div className={styles.Chat_Feed_Messages}>
							{messages.length ? React.Children.toArray(generateMessages(messages, userId)) : <></>}
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


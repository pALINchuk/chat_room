import React, {useEffect, useRef} from 'react';
import styles from './Message.module.sass'

type MessageProps = {
	author: string,
	text: string,
	isClient: boolean
};

export const Message = ({author, text, isClient}: MessageProps) => {


	const messageRef : React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

	useEffect(() => {

		const theme = localStorage.getItem("theme")

		if(messageRef.current){
			if(theme=='"light"'){
				messageRef.current.classList.add(styles.light_mode)
				messageRef.current.classList.remove(styles.dark_mode)
			}else{
				messageRef.current.classList.add(styles.dark_mode)
				messageRef.current.classList.remove(styles.light_mode)
			}
		}
	}, [messageRef]);

	return (
		<>
		<div className={[styles.Message, isClient ? styles.Message__right : null, styles.dark_mode].join(' ')} ref={messageRef}>
			<p className={[styles.Message_author, isClient ? styles.Message_author__client : null].join(' ')}>
				{author}
			</p>
			<div className={[styles.Message_Content, isClient ? styles.Message_Content__right : null].join(' ')}>
				<p className={styles.Message_Content_text}>
					{text}
				</p>
			</div>
		</div>
		</>
	);
}

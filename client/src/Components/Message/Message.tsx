import React, {useRef} from 'react';
import styles from './Message.module.sass'

type MessageProps = {
	author: string,
	text: string,
	isClient: boolean
};

export const Message = ({author, text, isClient}: MessageProps) => {

	//const authorRef : React.RefObject<HTMLParagraphElement> = useRef<HTMLParagraphElement>(null)
	//const messageRef : React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

	return (
		<>
		<div className={[styles.Message, isClient ? styles.Message__right : null].join(' ')} >
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

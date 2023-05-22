import React, {useEffect, useRef} from 'react';
import styles from "./HomePage.module.sass"
import {Link} from "react-router-dom";
import useLocalStorage from "use-local-storage";



export const HomePage = () => {

	const pageRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

	const [theme, setTheme] = useLocalStorage<string>("theme", localStorage.getItem('theme') ?? 'dark' )


	const handleThemeSwitch = () =>{
		if(theme == "dark"){
			setTheme("light")
			if(pageRef.current) {
				pageRef.current.classList.add(styles.light_mode)
				pageRef.current.classList.remove(styles.dark_mode)
			}
		}else{
			setTheme("dark")
			if(pageRef.current){
				pageRef.current.classList.add(styles.dark_mode)
				pageRef.current.classList.remove(styles.light_mode)
			}
		}

	}

	return (
		<div className={[styles.HomePage, theme=="light" ? styles.light_mode : styles.dark_mode ].join(' ')} ref={pageRef}>
			<h1 className={styles.HomePage_header}>Welcome to to this groupChat</h1>
			<button className={styles.HomePage_switch} onClick={handleThemeSwitch}>switch theme</button>
			<Link to="/chat" className={styles.HomePage_chatLink}>Go to chat</Link>
		</div>
	);
}

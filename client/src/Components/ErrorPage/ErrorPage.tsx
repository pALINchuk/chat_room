import React from 'react';
import styles from "./ErrorPage.module.sass"
import {Link} from "react-router-dom";

export const ErrorPage = () => {
	return (
		<div className={styles.ErrorPage}>
			<div className={styles.ErrorPage_Content}>
				<h1 className={styles.ErrorPage_Content_missingHeader}>
					Oops, looks like the page you are looking for is missing!
				</h1>
				<Link to="/" className={styles.ErrorPage_Content_homeLink}>home page</Link>
			</div>
		</div>
	);
};


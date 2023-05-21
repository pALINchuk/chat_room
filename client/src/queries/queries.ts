import {DocumentNode, gql} from "@apollo/client";

export const LOGIN_MUTATION: DocumentNode = gql`
	mutation ($username: String!, $password: String!){
		login(username: $username, password: $password){
			id
			username
			password
		}
	}
`

export const REGISTER_MUTATION: DocumentNode = gql`
	mutation ($username: String!, $password: String!){
		register(username: $username, password: $password){
			username
			password
		}
	}
`

export const MESSAGES_QUERY: DocumentNode = gql`
	{
		messages{
			text
			post_date
			user{
				id
				username
			}
		}
	}
`

export const ADD_MESSAGE: DocumentNode = gql`
	mutation($text: String!, $post_date: String!, $userId: ID!){
		addMessage(text: $text, post_date: $post_date, userId: $userId){
			text
		}
	}
`


export const NEW_MESSAGES_SUBSCRIBE: DocumentNode = gql`
	subscription{
		newMessage{
			text
			post_date
			user{
				username
				id
			}
		}
	}	
`

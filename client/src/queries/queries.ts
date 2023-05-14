import {DocumentNode, gql} from "@apollo/client";

export const LOGIN_MUTATION: DocumentNode = gql`
	mutation ($username: String!, $password: String!){
		login(username: $username, password: $password){
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
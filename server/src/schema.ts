import {buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID} from "graphql"
import _ from "lodash"

const exampleData = {
	messages:[
		{
			id: 1,
			text: "hello admin, how are you doing?",
			post_date: Date.now().toString(),
			userId: 2
		},
		{
			id: 2,
			text: "Mariana, come back, please, I miss you *sad eyes*",
			post_date: Date.now().toString(),
			userId: 1
		},
		{
			id: 3,
			text: "die, cheater, I hate you",
			post_date: Date.now().toString(),
			userId: 2
		}
	],
	users:[
		{
			id: 1,
			username: "admin",
			password: "admin"
		},
		{
			id: 2,
			username: "Mariana",
			password: "TheOneWhoLovedMe"
		}
	],
	tokenBlackList: [
		{id: 1, token: ""},
		{id: 2, token: ""}
	]
}



const UserType: GraphQLObjectType = new GraphQLObjectType({
	name: 'User',
	fields: () =>({
		id: {type: GraphQLID},
		username: {type: GraphQLString},
		password: {type: GraphQLString}
	})
})

const MessageType: GraphQLObjectType = new GraphQLObjectType({
	name: 'Message',
	fields: () =>({
		id: {type: GraphQLID},
		text: {type: GraphQLString},
		post_date: {type: GraphQLString},
		user: {
			type: UserType,
			resolve: (parent, args)=>{
				return _.find(exampleData.users, {id: parent.userId})
			}
		}

	})
})

const TokenType: GraphQLObjectType = new GraphQLObjectType({
	name: 'Token',
	fields: () =>({
		id: {type: GraphQLID},
		token: {type: GraphQLString}
	})
})


const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		message:{
			type: MessageType,
			args: {id: {type: GraphQLInt}},
			resolve: (parent, args) =>{
				return _.find(exampleData.messages, {id: args.id})
			}
		},
		user:{
			type: UserType,
			args: {id: {type: GraphQLInt}},
			resolve: (parent, args) =>{
				return _.find(exampleData.users, {id: args.id})
			}
		}
	}
})



export const schema : GraphQLSchema = new GraphQLSchema({
	query: RootQuery
})
import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} from "graphql"
import {addMessage, message, messages, register, user} from "./resolvers";
import {login} from "./resolvers";
import {MessageType, TokenType, UserType, UserWithTokenType} from "./types";





const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		message:{
			type: MessageType,
			args: {id: {type: GraphQLID}},
			resolve: message
		},
		user:{
			type: UserType,
			args: {id: {type: GraphQLString}},
			resolve: user
		},
		messages:{
			type: GraphQLList(MessageType),
			resolve: messages
		}

	}
})

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields:{
		addMessage:{
			type: MessageType,
			args: {
				text: {type: new GraphQLNonNull(GraphQLString)},
				post_date: {type: new GraphQLNonNull(GraphQLString)},
				userId: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve: addMessage
		},
		register: {
			type: UserWithTokenType,
			args: {
				username: {type: new GraphQLNonNull(GraphQLString)},
				password: {type: new GraphQLNonNull(GraphQLString)}
			},
			resolve: register
		},
		login:{
			type: TokenType,
			args: {
				username: {type: GraphQLString},
				password: {type: GraphQLString}
			},
			resolve: login
		}
	}
})




export const schema : GraphQLSchema = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})
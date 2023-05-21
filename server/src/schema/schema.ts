import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} from "graphql"
import {addMessage, message, messages, register, user, newMessage} from "./resolvers";
import {login} from "./resolvers";
import {MessageType, TokenType, UserType} from "./types";





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
			type: new GraphQLList(MessageType),
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
			type: UserType,
			args: {
				username: {type: new GraphQLNonNull(GraphQLString)},
				password: {type: new GraphQLNonNull(GraphQLString)}
			},
			resolve: register
		},
		login:{
			type: UserType,
			args: {
				username: {type: GraphQLString},
				password: {type: GraphQLString}
			},
			resolve: login
		}
	}
})

const Subscription = new GraphQLObjectType({
	name: 'Subscription',
	fields:{
		newMessage:{
			type: new GraphQLNonNull(MessageType),
			subscribe: newMessage
		}
	}
})


export const schema : GraphQLSchema = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
	subscription: Subscription
})
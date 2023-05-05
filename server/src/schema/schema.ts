import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} from "graphql"
import {Document, HydratedDocument} from "mongoose";
import {IUser, Message} from "../models";
import {User} from "../models";
import {signToken, verifyPassword} from "../utils";
import {addMessage, register} from "./resolvers";
import {login} from "./resolvers";




const UserType: GraphQLObjectType = new GraphQLObjectType({
	name: 'User',
	fields: () =>({
		id: {type: GraphQLID},
		username: {type: GraphQLString},
		password: {type: GraphQLString},
		messages: {
			type: new GraphQLList(MessageType),
			resolve(parent, args){
				return Message.find({userId: parent.id})
			}
		}
	})
})

const UserWithTokenType: GraphQLObjectType = new GraphQLObjectType({
	name: 'UserWithToken',
	fields: () =>({
		id: {type: GraphQLID},
		username: {type: GraphQLString},
		password: {type: GraphQLString},
		messages: {
			type: new GraphQLList(MessageType),
			resolve(parent, args){
				return Message.find({userId: parent.id})
			}
		},
		token: {type: GraphQLString}
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
			resolve(parent, args){
				return User.findById(parent.userId);
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
			args: {id: {type: GraphQLID}},
			resolve: (parent, args) =>{
				return Message.findById(args.id)
			}
		},
		user:{
			type: UserType,
			args: {id: {type: GraphQLString}},
			resolve: (parent, args, context) =>{
				console.log(context)
				return User.findById(args.id)
			}
		},
		messages:{
			type: GraphQLList(MessageType),
			resolve: (parent, args) =>{
				return Message.find({})
			}
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
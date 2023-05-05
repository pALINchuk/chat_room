import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";
import {Message, User} from "../models";

export const UserType: GraphQLObjectType = new GraphQLObjectType({
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

export const UserWithTokenType: GraphQLObjectType = new GraphQLObjectType({
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

export const MessageType: GraphQLObjectType = new GraphQLObjectType({
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


export const TokenType: GraphQLObjectType = new GraphQLObjectType({
	name: 'Token',
	fields: () =>({
		id: {type: GraphQLID},
		token: {type: GraphQLString}
	})
})
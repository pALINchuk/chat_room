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
import {hashPassword, signToken, verifyPassword} from "../utils";
import {verify} from "argon2";




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
			resolve: (parent, args) =>{
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
			resolve(parent, args:{text: string, post_date: string, userId: string}){
				const {text, post_date, userId} = args;
				const message = new Message({
					text: text,
					post_date: post_date,
					userId: userId
				})
				return message.save()
			}
		},
		register: {
			type: UserWithTokenType,
			args: {
				username: {type: new GraphQLNonNull(GraphQLString)},
				password: {type: new GraphQLNonNull(GraphQLString)}
			},
			resolve: async (parent, args : {username: string, password: string}) => {
				const {username, password}: {username: string, password: string} = args;
				const hashedPassword: string = await hashPassword(password)

				const result: HydratedDocument<IUser> = await new User({
					username: username,
					password: hashedPassword
				}).save()
				console.log(result)
				return {
					username: result.username,
					password: result.password,
					token: signToken({userId: result._id})
				}
			}
		},
		login:{
			type: TokenType,
			args: {
				username: {type: GraphQLString},
				password: {type: GraphQLString}
			},
			resolve: async (parent, args: {username: string, password: string}) =>{
				const {username, password}: {username: string, password: string} = args;

				const result: HydratedDocument<IUser> = await User.findOne({username: username})
				if(!result){
					throw new Error("User not found")
				}

				const isValidPassword: boolean = await verifyPassword(result.password, password)
				if (!isValidPassword) {
					throw new Error("Invalid password");
				}

				return {
					token: signToken({userId: username})
				}
			}
		}
	}
})






export const schema : GraphQLSchema = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})
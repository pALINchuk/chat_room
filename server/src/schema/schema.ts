import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} from "graphql"
import {find as _find, filter as _filter} from "lodash"
import {Message} from "../models";
import {User} from "../models";


const UserType: GraphQLObjectType = new GraphQLObjectType({
	name: 'User',
	fields: () =>({
		id: {type: GraphQLID},
		username: {type: GraphQLString},
		password: {type: GraphQLString},
		messages: {
			type: new GraphQLList(MessageType),
			resolve(parent, args){
				// return _filter(exampleData.messages, {userId: parent.id})
			}
		}
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

// TO BE IMPLEMENTED
// const TokenType: GraphQLObjectType = new GraphQLObjectType({
// 	name: 'Token',
// 	fields: () =>({
// 		id: {type: GraphQLID},
// 		token: {type: GraphQLString}
// 	})
// })


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
		addUser:{
			type: UserType,
			args: {
				username: {type: new GraphQLNonNull(GraphQLString)},
				password: {type: new GraphQLNonNull(GraphQLString)}
			},
			resolve(parent, args){
				const user = new User({
					username: args.username,
					password: args.password
				})
				return user.save()
			}
		},
		addMessage:{
			type: MessageType,
			args: {
				text: {type: new GraphQLNonNull(GraphQLString)},
				post_date: {type: new GraphQLNonNull(GraphQLString)},
				userId: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent, args){
				const message = new Message({
					text: args.text,
					post_date: args.post_date,
					userId: args.userId
				})
				return message.save()
			}
		}
	}
})



export const schema : GraphQLSchema = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})
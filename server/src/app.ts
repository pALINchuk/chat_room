import express, {Express, Request, Response} from 'express';
import bodyParser, {BodyParser} from "body-parser";
import logger from "morgan";
import {graphqlHTTP} from "express-graphql";
import mongoose from "mongoose"
import dotenv from "dotenv"
import {schema} from "./schema/schema";
import {authMiddleware} from "./auth/authMiddleware";



const app : Express = express()
dotenv.config()



app.use(bodyParser());
app.use(logger('dev'));





mongoose.connect('mongodb://127.0.0.1:27017/chatwall_db').catch(
	err => console.error(err)
)
mongoose.connection.once('open', ()=>{
	console.log('connected to MONGOOOOO')
})







app.use(authMiddleware)
app.use('/graphql',
	graphqlHTTP((req:any)=>({
		schema: schema,
		graphiql: true,
		context:{
			isAuth: req.isAuth,
			user: req.user,
			error: req.error
		}
	}))
)

app.get('/',(req : Request,res : Response)=>{
	res.send('Express API')
})




export {app}
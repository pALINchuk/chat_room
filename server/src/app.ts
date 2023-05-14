import express, {Express, Request, Response} from 'express';
import bodyParser, {BodyParser} from "body-parser";
import logger from "morgan";
import {graphqlHTTP} from "express-graphql";
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import session from "express-session"
import {schema} from "./schema/schema";
import {authMiddleware} from "./auth/authMiddleware";



const app : Express = express()
dotenv.config()



app.use(bodyParser());
app.use(cookieParser());
app.use(logger('dev'));
app.use(cors({
	origin: "http://localhost:3001",
	credentials: true
}))



mongoose.connect('mongodb://127.0.0.1:27017/chatwall_db').catch(
	err => console.error(err)
)
mongoose.connection.once('open', ()=>{
	console.log('connected to MONGOOOOO')
})







app.use(authMiddleware)
app.use('/graphql',
	graphqlHTTP((req: any, res: Response)=>({
		schema: schema,
		graphiql: true,
		context:{
			isAuth: req.isAuth,
			user: req.user,
			error: req.error,
			res: res
		}
	}))
)

app.get('/',(req : Request,res : Response)=>{
	res.send('Express API')
})




export {app}
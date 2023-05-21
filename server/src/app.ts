import express, {Express, Request, Response} from 'express';
import bodyParser from "body-parser";
import logger from "morgan";
import {graphqlHTTP} from "express-graphql";
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import ws from "ws"
import {useServer} from "graphql-ws/lib/use/ws";
import {execute, subscribe} from "graphql";
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

app.get('/isAuthorized', (req:any,res:Response)=>{
	res.json({isAuth: req.isAuth, user: req.user})
})

app.get('/logout', (req:any,res:Response)=>{
	res.clearCookie("auth")
	res.send('')
})

app.get('/',(req : Request,res : Response)=>{
	res.send('Express API')
})


function configureWSServer(server: any){
	const WSS = new ws.Server({
		server,
		path: "/subscriptions"
	})

	useServer({
		schema,
		execute,
		subscribe,
			onConnect: (ctx) => {
				console.log('Connect');
			},
			onSubscribe: (ctx, msg) => {
				console.log('Subscribe');
			},
			onNext: (ctx, msg, args, result) => {
				console.debug('Next');
			},
			onError: (ctx, msg, errors) => {
				console.error('Error');
			},
			onComplete: (ctx, msg) => {
				console.log('Complete');
			},
	},
	WSS)

	console.log('websocket server is listening on /subscriptions')

}




export {app, configureWSServer}
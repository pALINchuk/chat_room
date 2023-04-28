import express, {Express, Request, Response} from 'express';
import bodyParser, {BodyParser} from "body-parser";
import logger from "morgan";
import {graphqlHTTP} from "express-graphql";
import mongoose from "mongoose"
import {schema} from "./schema";

const app : Express = express()

app.use(bodyParser());
app.use(logger('dev'));





mongoose.connect('mongodb://127.0.0.1:27017/chatwall_db').catch(
	err => console.error(err)
)
mongoose.connection.once('open', ()=>{
	console.log('connected to MONGOOOOO')
})








app.use('/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true
	})
)

app.get('/',(req : Request,res : Response)=>{
	res.send('Express API')
})




export {app}
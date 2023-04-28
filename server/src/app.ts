import express, {Express, Request, Response} from 'express';
import bodyParser, {BodyParser} from "body-parser";
import logger from "morgan";
import {graphqlHTTP} from "express-graphql";
import {schema} from "./schema";

const app : Express = express()

app.use(bodyParser());
app.use(logger('dev'));






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
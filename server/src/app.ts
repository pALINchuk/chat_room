import express, {Express, Request, Response} from 'express';
import bodyParser, {BodyParser} from "body-parser";
import logger from "morgan";


const app : Express = express()

app.use(bodyParser());
app.use(logger('dev'));

app.get('/',(req : Request,res : Response)=>{
	res.send('Express API')
})




export {app}
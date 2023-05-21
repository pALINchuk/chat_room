import {app, configureWSServer} from '../app'


const PORT: number = 3000



const server = app.listen(PORT, ()=>{
	console.log(`listenning on ${PORT}`)
	configureWSServer(server)
})


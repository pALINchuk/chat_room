import {verifyToken} from "../utils";


export const authMiddleware = (req,res,next) =>{
	const authJWT = req.cookies['auth'] ?? undefined

	if (!authJWT) {
		req.error = "No authentication header found."
		req.isAuth = false
		return next()
	}

	let decoded;
	try{
		decoded = verifyToken(authJWT)
	} catch (err) {
		req.isAuth = false
		req.error = err.message
		return next()
	}


	if(!decoded){
		req.isAuth = false
		req.error = "Unable to decode jwt"
		return next()
	}

	req.isAuth = true
	req.user = decoded
	req.error = null
	return next()

}
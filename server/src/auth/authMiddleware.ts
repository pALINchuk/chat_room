import {verifyToken} from "../utils";
import {User} from "../models";


export const authMiddleware = async (req,res,next) =>{
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
	let user = null;
	try{
		user = await User.findById(decoded.userId)
	}catch(err){
		req.isAuth = false
		req.error = err.message
		return next()
	}

	if(!user){
		req.isAuth = false
		req.error = 'unauthorized'
		return next()
	}


	req.isAuth = true
	req.user = decoded
	req.error = null
	return next()

}
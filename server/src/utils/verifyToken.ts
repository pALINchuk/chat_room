import jwt, {Token} from "jsonwebtoken"



export const verifyToken = async (token) =>{
	return jwt.verify(token, process.env.JWT_SECRET)
}
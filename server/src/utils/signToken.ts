import jwt from "jsonwebtoken"


export const signToken = async (data) =>{
	if(! process.env.JWT_SECRET )
		throw new Error('SECRET KEY NOT PROVIDED')
	return await jwt.sign(data, process.env.JWT_SECRET)
}
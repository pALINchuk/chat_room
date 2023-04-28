import {hash, argon2id} from "argon2";

export const hashPassword = async (password) =>{
	return await hash(password,{
		type: argon2id
	})
}



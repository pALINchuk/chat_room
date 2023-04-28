import {verify, argon2id} from "argon2";

export const verifyPassword = async (hash: string, password: string) =>{
	return await verify(hash, password, {
		type: argon2id
	})
}
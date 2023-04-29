import {verify, argon2id} from "argon2";

export const verifyPassword = async (hash: string, password: string) : Promise<boolean> =>{
	return await verify(hash, password)
}
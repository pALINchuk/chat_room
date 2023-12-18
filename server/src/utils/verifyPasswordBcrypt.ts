import bcrypt from 'bcrypt';

export const verifyPasswordBcrypt = async (hash: string, password: string): Promise<boolean> => {
    try {
        const match = await bcrypt.compare(password, hash);
        return match;
    } catch (error) {
        console.error('Error verifying password:', error);
        throw error;
    }
};
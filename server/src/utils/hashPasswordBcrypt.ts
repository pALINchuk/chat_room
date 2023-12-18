import bcrypt from 'bcrypt';

export const hashPasswordBcrypt = async (password) => {
    const saltRounds = 10; // You can adjust the number of salt rounds based on your security requirements
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
};
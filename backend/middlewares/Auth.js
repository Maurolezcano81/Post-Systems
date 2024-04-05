import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const hashPwd = (pwd) =>{
    try {
        const hashedPwd = bcrypt.hash(process.env.HASH_BCRYPT ,pwd);
        return hashedPwd;
    } catch (error) {
        console.error(error.name);
    }
}


const generateToken = (data) =>{
    
    const token = jwt.sign({
        id: data.id
    }, process.env.TOKEN_JWT)

    return token;
}

const authMiddlewares = {
    hashPwd,
    generateToken
}

export default authMiddlewares;
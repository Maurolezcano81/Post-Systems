import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const hashPwd = (pwd) => {
    try {
        const hashedPwd = bcrypt.hash(pwd, 10);
        return hashedPwd;
    } catch (error) {
        console.error(error.name);
    }
}


const generateToken = (data) => {

    const token = jwt.sign({
        id: data.id
    }, process.env.TOKEN_JWT)

    return token;
}

const checkLoggin = (req, res, next) => {
    const autHead = req.headers.authorization;

    if (!autHead || !autHead.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "Primero debes iniciar sesión"
        })
    };

    const token = autHead.split(' ')[1];
    try {
        const checkToken = jwt.verify(token, process.env.TOKEN_JWT);
        if (!checkToken) {
            return res.status(401).json({
                message: "Primero debes iniciar sesión"
            })
        }
        req.idUser = checkToken.id;
        next();
    } catch (error) {
        console.log(error.name);
        return res.status(401).json({
            message: "token invalido"
        })
    }

}

const authMiddlewares = {
    hashPwd,
    generateToken,
    checkLoggin
}

export default authMiddlewares;
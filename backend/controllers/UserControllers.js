import User from '../models/UserModel.js';
import authMiddlewares from '../middlewares/Auth.js';
import bcrypt from 'bcryptjs';

const signUp = async (req, res) => {
    const { username, email, pwd, avatarUrl } = req.body;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    try {

        if (username.length == 0) {
            return res.status(403).json({
                message: "Introduce un nombre de usuario"
            })
        } else if (username.length <= 6) {
            return res.status(403).json({
                message: "Introduce un nombre de usuario mayor a 6 caracteres"
            })
        }
        

        if (email.length == 0) {
            return res.status(403).json({
                message: "Introduce un correo electronico"
            })
        } else {
            if (!emailRegex.test(email)) {
                return res.status(403).json({
                    message: "Introduce un correo electronico valido"
                })
            }
        }

        
        if (pwd.length == 0) {
            return res.status(403).json({
                message: "Introduce una clave"
            })
        } else if (pwd.length <= 5) {
            return res.status(403).json({
                message: "Introduce una clave mayor a 4 caracteres"
            })
        }

        
        if (avatarUrl.length == 0) {
            return res.status(403).json({
                message: "Introduce una imagen de perfil"
            })
        }

        const checkUsernameExists = await User.createSchema.findOne({
            username: username
        })

        if (checkUsernameExists) {
            return res.status(403).json({
                message: "Nombre de usuario utilizado"
            });
        }

        const checkEmailExists = await User.createSchema.findOne({
            email: email
        })

        if (checkEmailExists) {
            return res.status(403).json({
                message: "Correo electronico utilizado"
            })
        }

        const pwdHashed = await authMiddlewares.hashPwd(pwd);
        console.log(pwdHashed);
        const userRegister = await User.createSchema.create({
            username: username,
            email: email,
            password: pwdHashed,
            avatarUrl: avatarUrl
        })

        return res.status(200).json({
            message: "Usuario creado correctamente",
            user: userRegister
        })
    } catch (error) {
        console.error(error);
    }
}

const signIn = async (req, res) =>{
    const { inputLogin, pwd } = req.body
    try {
        if(inputLogin.length == 0){
            return res.status(403).json({
                message: "Introduce un usuario o email"
            })
        }

        if(pwd.length == 0){
            return res.status(403).json({
                message: "Introduce una contraseña"
            })
        }

        const user = await User.createSchema.findOne({
            $or: [
                {
                    username: inputLogin
                },
                {
                    email: inputLogin
                }
            ]
        })

        if(!user){
            return res.status(403).json({
                message: "Usuario o correo electronico incorrecto"
            })
        }

        const checkPwd = await bcrypt.compare(pwd, user.password);

        if(!checkPwd) {
            return res.status(403).json({
                message: "Contraseña incorrecta, intentelo nuevamente"
            })
        }

        const token = await authMiddlewares.generateToken(user)

        const userData = {
            token: token,
            user: user.username,
            avatarUrl: user.avatarUrl
        }
        return res.status(200).json({
            message: "Usuario autenticado correctamente",
            userData
        })

    } catch (error) {
        
    }
}

const UserController = {
    signUp,
    signIn
}

export default UserController;
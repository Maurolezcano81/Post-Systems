import Post from '../models/PostModel.js';
import authMiddlewares from '../middlewares/Auth.js';

const createPost = async (req, res) => {
    const { title, description, imageUrl } = req.body;
    const autor = req.idUser;
    try {

        if (title.length === 0) {
            return res.status(403).json({
                message: "El titulo es obligatorio"
            })
        }

        if (description.length === 0) {
            return res.status(403).json({
                message: "El contenido del post es obligatorio"
            })
        } else if (description.length > 150) {
            return res.status(403).json({
                message: "El contenido del post debe ser menor a 150 caracteres"
            })
        }

        const postData = {
            title,
            description,
            author: autor,
            imageUrl,
        }

        console.log(postData);
        const postCreated = await Post.createSchema.create(postData);

        if (!postCreated) {
            res.status(403).json({
                message: "Ha ocurrido un problema al crear el Post"
            })
        }

        return res.status(201).json({
            message: "Post creado exitosamente",
            postCreated
        })
    } catch (error) {
        console.error(error);
    }
}

const showPosts = async (req, res) => {
    try {

        const allPosts = await Post.createSchema.find().populate('author', 'username avatarUrl').populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: 'username avatarUrl'
            }
        }).sort('-createdAt');

        if (allPosts.length === 0) {
            return res.status(404).json({
                message: "No se encontraron publicaciones..."
            });
        }

        return res.status(200).json({
            allPosts
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Ha ocurrido un error interno"
        });
    }
}

const showPost = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        if (!id) {
            return res.status(404).json({
                message: "Introduzca un url valido"
            });
        };


        // FALTA ANADIR LOS COMENTARIOS
        const post = await Post.createSchema.findById({
            _id: id
        }).populate('author', 'username avatarUrl');

        if (post === 0) {
            return res.status(404).json({
                message: "Este post no existe"
            });
        };

        return res.status(200).json({
            post
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Ha ocurrido un error interno"
        })
    };
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    const idUser = req.idUser;

    const checkPost = await Post.createSchema.findById(id);

    console.log(idUser);
    console.log(checkPost);

    if (checkPost.author != idUser) {
        return res.status(403).json({
            message: "No tiene los permisos para eliminar este posteo"
        })
    }

    try {
        if (!id) {
            return res.status(403).json({
                message: "Este post no existe"
            });
        };

        const responseDelete = await Post.createSchema.findByIdAndDelete({
            _id: id
        });

        if (!responseDelete) {
            return res.status(403).json({
                message: "Ha ocurrido un problema al eliminar el post"
            });
        };

        return res.status(200).json({
            message: "Post eliminado exitosamente",
            responseDelete
        })
    } catch (error) {
        console.log(error.name);
        return res.status(500).json({
            message: "Ocurrio un error interno"
        });
    }
}

const editPost = async (req, res) => {
    const { title, description, imageUrl } = req.body;
    const { id } = req.params;
    const idUser = req.idUser;

    try {
        
    const checkPost = await Post.createSchema.findById(id);

    if (checkPost.author != idUser) {
        return res.status(403).json({
            message: "No tiene permisos para editar este post"
        });
    }
    if (!checkPost) {
        return res.status(404).json({
            message: "Hubo un problema al obtener el post"
        })
    }

    const newData = {
        title,
        description,
        imageUrl
    }

    const updatedPost = await Post.createSchema.findByIdAndUpdate(
        {
            _id: id,
        },
        newData
    )

    if(!updatedPost){
        return res.status(500).json({
            message: "Ha ocurrido un problema al actualizar el post"
        });
    }

    return res.status(200).json({
        message: "Post actualizado correctamente",
        updatedPost
    });
    } catch (error) {
        console.log(error.name);
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

const PostController = {
    createPost,
    showPosts,
    showPost,
    deletePost,
    editPost
}

export default PostController;
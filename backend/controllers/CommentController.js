import Comment from "../models/CommentModel.js";
import Post from "../models/PostModel.js";

const createComment = async (req, res) => {
    const { description } = req.body
    const { id } = req.params;
    const autor = req.idUser;

    try {

        if(description.length == 0){
            return res.status(403).json({
                message: "Introduce un comentario"
            })
        } else if(description.length > 150){
            return res.status(403).json({
                message: "La cantidad maxima de caracteres es de 150"
            })
        }

        const checkPost = await Post.createSchema.findById(id);

        if (!checkPost) {
            return res.status(500).json({
                message: "Error interno del servidor"
            })
        };

        const createComment = await Comment.createSchema.create({
            author: autor,
            description
        })

        if (!createComment) {
            return res.status(403).json({
                message: "No se ha podido crear el comentario"
            })
        }

        const postToUpdate = await Post.createSchema.findOneAndUpdate({
            _id: id
        },
            {
                $push: {
                    comments: createComment._id
                }
            },
    { new: true }
        )

if (!postToUpdate) {
    return res.status(500).json({
        message: "Error interno en el servidor"
    })
}

return res.status(200).json({
    message: "Comentario creado exitosamente",
    postToUpdate
})
    } catch (error) {
    console.error(error);
    return res.status(500).json({
        message: "Error interno en el servidor"
    })
}
}

const deleteComment = async (req, res) =>{
    const { id } = req.params;
    const autor = req.idUser;

    const checkComment = await Comment.createSchema.findById(id);

    if(!checkComment){
        return res.status(404).json({
            message: "Ha ocurrido un problema al obtener el comentario"
        })
    };

    if(checkComment.author != autor){
        return res.status(403).json({
            message: "No tiene los permisos para eliminar este comentario"
        });
    }

    const deleteComment = await Comment.createSchema.findByIdAndDelete(id);

    if(!deleteComment){
        return res.status(403).json({
            message: "Ha ocurrido un problema al eliminar el comentario"
        })
    };

    return res.status(200).json({
        message: "Comentario eliminado exitosamente",
        deleteComment
    });
}

const CommentControllers = {
    createComment,
    deleteComment
}

export default CommentControllers;
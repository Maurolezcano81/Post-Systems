import DeleteButton from "../Comments/DeleteButton";

import useAuth from '../../hooks/useAuth';
const Comment = (props) => {
    const { authData } = useAuth();
    
    return (
        <div className="comment__container">
            <div className="comment__user">
                <img src={props.avatarUrl} alt={props.authorUsername} />
                <p>@{props.authorUsername}</p>
            </div>
            <div className="comment__description">
                <p>{props.descriptionComment}</p>
                <small>{props.updatedAt}</small>
            </div>
            <div className="comment__controls">
                {authData.id === props.authorCommentId ? <DeleteButton commentId={props.commentId}/> : null}
            </div>
        </div>
    )
}

export default Comment;
import {
    Link,
} from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import usePost from '../../hooks/usePost';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
const DeleteButton = (props) => {
    const postUrl = `${process.env.SV_ADDRESS}:${process.env.SV_PORT}${process.env.SV_PATH}/post/${props.commentId}/comment`
    const { authData } = useAuth();
    const { postCreated ,setPostCreated } = usePost();
    const handleDeletePost = (e) =>{
        e.preventDefault();
        
        const deletePost = async () =>{

            const fetchRequest = await fetch(postUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                }
            })

            const response = await fetchRequest.json();
            setPostCreated(postCreated ? false : true);
            console.log(response.message);
        }

        deletePost();
    }

    return (
        <Link data-id={props.commentId} onClick={handleDeletePost}>
            <DeleteRoundedIcon />
        </Link >
    )
}

export default DeleteButton;
import {
    Link,
} from 'react-router-dom';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
const DeleteButton = (props) =>{
    return(
        <Link to={`/post/${props.postId}`}>
            <DeleteRoundedIcon />
        </Link>
    )
}

export default DeleteButton;
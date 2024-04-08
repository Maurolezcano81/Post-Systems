import {
    Link,
} from 'react-router-dom';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
const EditButton = (props) =>{
    return(
        <Link to={`/post/${props.postId}`}>
            <EditRoundedIcon />
        </Link>
    )
}

export default EditButton;
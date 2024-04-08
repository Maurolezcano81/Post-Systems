import {
    Link,
} from 'react-router-dom';

import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';

const CommentButton = (props) =>{
    return(
        <Link to={`/post/${props.postId}`}>
            <ChatBubbleOutlineRoundedIcon />
            {props.countComments}
        </Link>
    )
}

export default CommentButton;
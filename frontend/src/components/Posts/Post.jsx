import {
    Link,
} from 'react-router-dom';

import CommentButton from './CommentButton';
import ControlsPost from './ControlsPost';

import useAuth from '../../hooks/useAuth';

const Post = (props) => {
    const { authData } = useAuth();

    return (
        <div data-id={props.id} className="post">
            {props.authorId != authData.id ? <></> :
            <ControlsPost 
            postId={props.id}
            title={props.title}
            description={props.description}
            img={props.img}
            />}
            <div className='post-autor'>
                <div className='post-autor-img'>
                    <img src={props.authorImg}></img>
                </div>
                <Link data-id={props.authorId}>@{props.author}</Link>
            </div>
            <div className="post-title">
                <h2>{props.title}</h2>
            </div>
            <div className="post-description">
                <p>{props.description}</p>
            </div>
            <div className="post-img-container">
                <img src={props.img} alt={props.title} />
            </div>
            <div className='post-date'>
                <p>{props.createdAt}</p>
            </div>
            <div className="post-redirects">
                <CommentButton postId={props.id} countComments={props.countComments} />
            </div>
        </div>
    )
}

export default Post;
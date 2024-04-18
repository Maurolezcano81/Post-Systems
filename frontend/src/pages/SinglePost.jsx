import {
    useEffect,
    useState
} from 'react'

import {
    useParams,
    Link
} from 'react-router-dom';

import Post from '../components/Posts/Post';
import Comment from '../components/Comments/Comment';
import CreateComment from '../components/Comments/CreateComment';
import RedirectLoggin from '../components/Comments/RedirectLoggin';

import usePost from '../hooks/usePost';
import useAuth from '../hooks/useAuth';

const SinglePost = () => {
    const { id } = useParams();

    const postUrl = `${process.env.SV_ADDRESS}:${process.env.SV_PORT}${process.env.SV_PATH}/post/${id}`

    const { authData } = useAuth()
    const { postCreated } = usePost();

    const [postData, setPostData] = useState(null);
    const [postComments, setPostComments] = useState([])

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(postUrl, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const fetchData = await response.json();
            setPostData(fetchData.post);
            setPostComments(fetchData.post.comments);
        };

        fetchPost();
    }, [postUrl, postCreated]);

    return (
        <>
            <div className="single__post-container">
                <Link className='back__home' to='/'>Inicio</Link>
                <Post
                    id={postData?._id}
                    authorId={postData?.author._id}
                    authorImg={postData?.author.avatarUrl}
                    author={postData?.author.username}
                    title={postData?.title}
                    description={postData?.description}
                    img={postData?.imageUrl}
                    createdAt={postData?.createdAt}
                />


                <div className='comments__container'>

                    {authData.token && authData.token != "invitado" ?
                        <CreateComment postId={postData?._id} />  : <RedirectLoggin />  }
                    <h2>Comentarios</h2>
                    {postComments.map((comment) => (
                        <Comment
                            key={comment?._id}
                            authorCommentId={comment?.author._id}
                            avatarUrl={comment?.author.avatarUrl}
                            authorUsername={comment?.author.username}
                            descriptionComment={comment?.description}
                            updatedAt={comment?.updatedAt}
                            commentId={comment?._id}
                        />
                    ))}
                </div>
            </div>
        </>
    )

}

export default SinglePost;
import {
    useState,
    useEffect
} from 'react';
const postUrl = `${process.env.SV_ADDRESS}:${process.env.SV_PORT}${process.env.SV_PATH}/post`
import Post from '../components/Posts/Post';

import usePost from '../hooks/usePost';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    const { postCreated, setPostCreated } = usePost();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(postUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application-json'
                },
            })

            if (!response) {
                console.log('error en obtener los posts');
            }

            const data = await response.json();
            console.log(data.allPosts);
            setPostCreated(null);
            setPosts(data.allPosts);
        }

        fetchData();
    }, [postCreated])
    return (
        <div className="posts-container">
            {posts.map((post) => (
                <Post key={post._id}
                    id={post._id}
                    title={post.title}
                    authorId={post.author._id}
                    author={post.author.username}
                    description={post.description}
                    createdAt={post.createdAt}
                    img={post.imageUrl}
                    authorImg={post.author.avatarUrl}
                    countComments={post.comments.length}
                />
            ))}
        </div>
    )
}

export default Posts;
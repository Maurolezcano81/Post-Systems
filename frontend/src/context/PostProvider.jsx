import {
    useState,
    createContext
} from 'react';

const PostContext = createContext();

const PostProvider = ({ children }) => {
    const [postCreated, setPostCreated] = useState(null);

    const changeStatePostCreated = (state) => {
        setPostCreated(state);
    }

    return (
        <PostContext.Provider
            value={{
                postCreated, setPostCreated, changeStatePostCreated
            }}
        >
            {children}
        </PostContext.Provider>
    )
}

export {
    PostProvider
}

export default PostContext
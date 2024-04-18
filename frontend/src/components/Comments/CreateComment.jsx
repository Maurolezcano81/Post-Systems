import {
    useState
} from 'react';

import useAuth from '../../hooks/useAuth';
import usePost from '../../hooks/usePost';
const CreateComment = (props) => {

    const apiUrl = `${process.env.SV_ADDRESS}:${process.env.SV_PORT}${process.env.SV_PATH}/post/${props.postId}/comment`

    const { authData } = useAuth();
    const { postCreated, setPostCreated } = usePost();
    const [description, setDescription] = useState('');


    const handleDescription = (e) => {
        setDescription(e.target.value);
    }
    const handleSubmitComment = (e) => {
        e.preventDefault();

        const fetchRequest = async () => {

            const response = await fetch(apiUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                },
                body: JSON.stringify({
                    description
                })
            })

            const fetchData = await response.json();
            setPostCreated(postCreated ? false : true);
        }

        fetchRequest();
    }
    return (
        <div className='create__comment__container'>
            <form className='form__create__comment' onSubmit={handleSubmitComment}>
                <div className='create__comment__description'>
                    <label htmlFor="description">
                        Nuevo Comentario:
                    </label>
                    <textarea onChange={handleDescription}></textarea>
                </div>
                <div className='create__comment__button'>
                    <button type='submit'>Comentar</button>
                </div>
            </form>
        </div>
    )
}


export default CreateComment;
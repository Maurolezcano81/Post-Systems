import {
    Link,
} from 'react-router-dom';

import {
    useState
} from 'react'

import useAuth from '../../hooks/useAuth';
import usePost from '../../hooks/usePost';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseIcon from '@mui/icons-material/Close';

const EditButton = (props) => {

    const apiUrl = `${process.env.SV_ADDRESS}:${process.env.SV_PORT}${process.env.SV_PATH}/post/${props.postId}`;

    const [postData, setPostData] = useState({
        title: props.title,
        description: props.description,
        imgUrl: props.img
    });


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [toggleImgInput, setToggleImgInput] = useState(false);
    const [respuesta, setRespuesta] = useState('');


    const { authData } = useAuth();
    const { setPostCreated } = usePost();

    const open = () => setModalIsOpen(true);
    const close = () => setModalIsOpen(false);

    const handleTitle = (e) => {
        setPostData({
            ...postData,
            title: e.target.value
        })
    }

    const handleDescription = (e) => {
        setPostData({
            ...postData,
            description: e.target.value
        })
    }

    const handleImgInput = () => {
        toggleImgInput ? setToggleImgInput(false) : setToggleImgInput(true);
    }

    const handleImgUrl = (e) => {
        setPostData({
            ...postData,
            img: e.target.value
        })
    }


    const handleEditPost = (e) => {
        e.preventDefault()

        const fetchRequest = async () => {

            const response = await fetch(apiUrl, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.token}`
                },
                body: JSON.stringify(postData)
            })

            const fetchData = await response.json();
            setPostCreated(false);
            setModalIsOpen(false);
            setRespuesta(fetchData.message);
        }

        fetchRequest();
    }

    return (
        <>
            <Link onClick={open}>
                <EditRoundedIcon />
            </Link>
            {modalIsOpen && (
                <div className="modal-container">
                    <form onSubmit={handleEditPost} className="modal_create_post">
                        <div className="modal-close">
                            <button onClick={close}>
                                <CloseIcon />
                            </button>
                        </div>
                        <h2>Modo de Edicion</h2>
                        <div className="modal-title">
                            <label>
                                Nuevo titulo:
                            </label>
                            <input value={postData.title} onChange={handleTitle} type="text" />

                        </div>
                        <div className="modal-body">
                            <label>
                                Nueva descripcion:
                            </label>
                            <textarea value={postData.description} onChange={handleDescription} className="modal-text" />
                        </div>
                        <div className="modal-img">
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={handleImgInput}
                                    checked={toggleImgInput}
                                /> Desea agregar una imagen al post?
                            </label>

                            {toggleImgInput ? (
                                <input value={postData.imgUrl} onChange={handleImgUrl} type="text" placeholder="Ingrese un enlace de imagen" />
                            ) : null}
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="button-create-modal">Crear</button>
                        </div>
                    </form>
                </div>

            )}

        </>

    )
}

export default EditButton;
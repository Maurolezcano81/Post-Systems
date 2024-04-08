import {
    useState
} from "react";


import CloseIcon from '@mui/icons-material/Close';

import useAuth from "../../hooks/useAuth";
import usePost from "../../hooks/usePost";
import CreatePostButton from "./CreatePostButton";

const ModalCreatePost = () => {

    const urlApi = `${process.env.SV_ADDRESS}:${process.env.SV_PORT}${process.env.SV_PATH}/post`;

    const { authData } = useAuth();

    const { createdPost, setPostCreated } = usePost();

    const [openModal, setOpenModal] = useState(false);

    const [toggleImgInput, setToggleImgInput] = useState(false);

    const [imgPost, setImgPost] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')

    const [respuesta, setRespuesta] = useState('');


    const open = () => setOpenModal(true);
    const close = () => setOpenModal(false);


    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleImgUrl = (e) => {
        setImgPost(e.target.value);
    }

    const handleImgInput = () => {
        toggleImgInput ? setToggleImgInput(false) : setToggleImgInput(true);
    }

    const handleCreatePost = (e) => {
        e.preventDefault();

        const createPost = async () => {
            try {
                const response = await fetch(urlApi, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`
                    },
                    body: JSON.stringify({
                        title: title,
                        description: description,
                        imageUrl: imgPost
                    })
                })

                if (!response) {
                    return;
                }

                const fetchData = response.json();

                setRespuesta(fetchData.message);
                setPostCreated(true);
                setOpenModal(false);
            } catch (error) {
                console.log(error.name);
            }
        }

        createPost();
    }


    return (
        <>
            <CreatePostButton onClick={open} />
            {openModal && (
                <div className="modal-container">
                    <form onSubmit={handleCreatePost} className="modal_create_post">
                        <div className="modal-close">
                            <button onClick={close}>
                                <CloseIcon />
                            </button>
                        </div>
                        <div className="modal-title">
                            <label>
                                Titulo:
                            </label>
                            <input onChange={handleTitle} type="text" />

                        </div>
                        <div className="modal-body">
                            <label>
                                Descripcion:
                            </label>
                            <textarea onChange={handleDescription} className="modal-text" />
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
                                <input onChange={handleImgUrl} type="text" placeholder="Ingrese un enlace de imagen" />
                            ) : null}
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="button-create-modal">Crear</button>
                            <p className="modal-footer-message">{respuesta}</p>
                        </div>
                    </form>
                </div>

            )}

        </>

    )
}

export default ModalCreatePost;
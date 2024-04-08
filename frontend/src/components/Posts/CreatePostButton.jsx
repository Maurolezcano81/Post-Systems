import AddRoundedIcon from '@mui/icons-material/AddRounded';
const CreatePostButton = ({onClick}) => {

    return (
        <button
            className='post-create-button'
            onClick={onClick}
        >
            <AddRoundedIcon/>
            Crear Post
        </button>
    )
}

export default CreatePostButton;
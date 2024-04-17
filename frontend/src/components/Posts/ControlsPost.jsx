import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

const ControlsPost = (props) => {
    return (
        <div className="controls-post">
            <DeleteButton postId={props.postId} />
            
            <EditButton 
            postId={props.postId}
            title={props.title}
            description={props.description}
            img={props.img}
            />
        </div>
    )
}

export default ControlsPost;
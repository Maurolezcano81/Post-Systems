import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

const ControlsPost = (props) => {
    return (
        <div className="controls-post">
            <DeleteButton postId={props.postId} />
            <EditButton postId={props.postId} />
        </div>
    )
}

export default ControlsPost;
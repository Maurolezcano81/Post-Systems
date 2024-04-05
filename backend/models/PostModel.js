import mongoose from 'mongoose';
import { ObjectId } from 'mongoose';

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }, 
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        type: ObjectId,
        ref: 'Comment'
    }],
    imageUrl: {
        type: String,
    }
},{
    timestamps: true
});

const createSchema = mongoose.model('Post', postSchema);

const Post = {
    createSchema
}
export default Post;
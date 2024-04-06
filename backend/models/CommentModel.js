import mongoose from 'mongoose';
import { ObjectId } from 'mongoose';

const commentSchema = mongoose.Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    description:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const createSchema = mongoose.model('Comment', commentSchema);

const Comment = {
    createSchema
};

export default Comment;
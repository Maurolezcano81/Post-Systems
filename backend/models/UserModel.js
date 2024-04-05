import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    avatarUrl:{
        type:String,
        required:true
    },
})

const createSchema = mongoose.model('User', UserSchema);
const User = {
    createSchema
};

export default User;
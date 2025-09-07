import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    phone:{
        type: String,
        required: true,
        unique: true,
    },
    wallet:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        unique: true,
    },
    accountType:{
        type: String,
        required: true,
    },
    projects: [
        {
            projectNumber: { type:String, required: true },
            projectName: { type:String, required: true },
            projectDescription: { type:String, required: true },
            projectStatus: { type:String, required: true },
            projectStartDate: { type:Date, required: true },
            projectEndDate: { type:Date, required: true },
        }
    ],
})

export default mongoose.model('User', UserSchema);
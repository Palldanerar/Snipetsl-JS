import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    pathDoc: {
        type: String,
        required: true
    },
    pathTask: {
        type: String,
        required: true
    },
})

const Subject = mongoose.model('Subject', SubjectSchema);

export default Subject;
import Subject from "../models/Subject.js";
import fs from "fs"

export const getAllSubject = async (request, response) => {
    try {

        const subject = await Subject.find()

        response.status(200).json(subject);

    } catch (error) {
        console.error(error.message);
        response.status(500).json({ msg: error.message });
    }
}

export const getSubject = async (request, response) => {
    try {
        const subject = await Subject.findById(request.params.subjectId);

        console.log(subject)

        let textDoc = fs.readFileSync(subject.pathDoc, "utf-8");
        let textTask = fs.readFileSync(subject.pathTask, "utf-8");

        const file = {
            id: subject._id,
            title: subject.title,
            theory: textDoc,
            practice: textTask
        }

        response.status(200).json(file);

    } catch (error) {
        console.error(error.message);
        response.status(500).json({ msg: error.message });
    }
}

export const uploadSubject = async (request, response) => {
    try {

        const doc = new Subject({
            title: request.body.title,
            pathDoc: request.files.doc[0].path,
            pathTask: request.files.task[0].path,
        })

        try {
            await doc.save()
            response.status(200).json({ message: "OK" });
        } catch (error) {
            console.error(error.message);
            response.status(500).json({ error: error.message });
        }

    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: error.message });
    }
}
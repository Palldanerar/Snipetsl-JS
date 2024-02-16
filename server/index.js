import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { getAllSubject, getSubject, uploadSubject } from "./controllers/SubjectController.js"
import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype == "text/markdown") {
            cb(null, 'upload/docs');
        } 

        if (file.mimetype == "application/json") {
            cb(null, 'upload/tasks');
        }
    },

    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

const upload = multer({ storage: storage })

mongoose.connect("mongodb://127.0.0.1:27017/Educational_Application")
    .then(() => {
        console.log("БАЗА ДАННЫХ ПОДКЛЮЧЕНА")
    })
    .catch((err) => {
        console.log(`БАЗА ДАННЫХ НЕ ПОДКЛЮЧЕНА. Ошибка: ${err}`)
    })

const app = express()


app.use(express.json())
app.use(cors())

app.get("/subject", getAllSubject )
app.get("/subject/:subjectId", getSubject )
app.post('/upload', upload.fields([{ name: 'doc', maxCount: 1 }, { name: 'task', maxCount: 1 }]), uploadSubject);

app.listen(9800, () => {
    console.log("Сервер запущен")
})
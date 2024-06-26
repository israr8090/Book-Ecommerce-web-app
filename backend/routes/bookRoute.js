import express from 'express';
import multer from 'multer';
import { addBook, listBook, removeBook } from '../controllers/bookController.js';

const bookRouter = express.Router();

//--Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
}); 

const upload = multer({storage:storage});

//--add Books--
bookRouter.post('/add', upload.single("image"), addBook);

//--list Books--
bookRouter.get('/list', listBook);

//--remove Books--
bookRouter.post('/remove', removeBook);


export default bookRouter;

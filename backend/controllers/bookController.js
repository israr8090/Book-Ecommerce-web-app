import bookModel from "../models/bookModel.js";
import fs from 'fs';

//-- add book item--
const addBook = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const book = new bookModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price, 
        category: req.body.category,
        image: image_filename
    });

    try {
        await book.save(); 
        res.json({ success: true, message: "Book Added" });  
    } catch (error) {
        console.log(error); 
        res.json({ success: false, message: "Error" });
    }

};

//--All good List--
const listBook = async (req, res) => {
    try {
        const books = await bookModel.find({});
        res.json({ success: true, data: books });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
};

//--delete book item--
const removeBook = async (req, res) => {
    try {
        const book = await bookModel.findById(req.body.id);
        fs.unlink(`uploads/${book.image}`, () => { });

        await bookModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Book Deleted" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { addBook, listBook, removeBook };
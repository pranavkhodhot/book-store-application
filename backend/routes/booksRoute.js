import express from "express"
import { Book } from "../models/bookModel.js";


const router = express.Router();

router.post('/', async (req,resp) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear  
        ) {
            return resp.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);
        return resp.status(201).send(book);

    } catch(error) {
        console.log(error.message)
        resp.status(500).send({ message: error.message});
    }
})

router.get('/:id', async (req,resp) => {
    try {

        const { id } = req.params;

        const book = await Book.findById(id);
        return resp.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        resp.status(500).send({ message: error.message });
    }
});

router.put('/:id', async (req,resp) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear  
        ) {
            return resp.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }
        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result) {
            return resp.status(404).json({ message: 'Book not found' });
        }
        return resp.status(200).send({message: 'Book updated successfully' });

    } catch(error) {
        console.log(error.message)
        resp.status(500).send({ message: error.message});
    }
})

router.delete('/:id', async (req,resp) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);
        if(!result) {
            return resp.status(404).json({ message: 'Book not found' });
        }
        return resp.status(200).send({message: 'Book deleted successfully' });

    } catch(error) {
        console.log(error.message)
        resp.status(500).send({ message: error.message});
    }
})

router.get('/', async (req,resp) => {
    try {
        const books = await Book.find({});
        return resp.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        resp.status(500).send({ message: error.message });
    }
});

export default router;
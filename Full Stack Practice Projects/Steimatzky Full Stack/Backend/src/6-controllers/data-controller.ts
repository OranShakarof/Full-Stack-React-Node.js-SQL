import express, { NextFunction, Request, Response } from "express";
import BookModel from "../3-models/book-model";
import dataService from "../5-services/data-service";
import StatusCode from "../3-models/status-code";

const router = express.Router();

router.get("/genres", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const genres = await dataService.getAllGenres();
        response.json(genres);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/books", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const books = await dataService.getAllBooks();
        response.json(books);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/books", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const book = new BookModel(request.body);
        const addedBook = await dataService.addBook(book);
        response.status(StatusCode.Created).json(addedBook);
    }
    catch(err: any) {
        next(err);
    }
});

router.delete("/books/:bookId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const bookId = +request.params.bookId;
        await dataService.deleteBook(bookId);
        response.status(StatusCode.NoContent);
    }
    catch(err: any) {
        next(err);
    }
});


export default router;

import dal from "../2-utils/dal";
import { OkPacket } from "mysql";
import GenreModel from "../3-models/genre-model";
import BookModel from "../3-models/book-model";
import { ResourceNotFoundError } from "../3-models/client-errors";

async function getAllGenres(): Promise<GenreModel[]> {
    const sql = "SELECT * FROM genres";
    const genres = await dal.execute(sql);
    return genres;
}

async function getAllBooks(): Promise<BookModel[]> {
    const sql = `SELECT books.*,genres.genreName
                    FROM books LEFT JOIN genres
                     ON genres.genreId = books.genreId`;
    const genres = await dal.execute(sql);
    return genres;
}

async function addBook(book: BookModel): Promise<BookModel> {
    book.validate();
    const sql = `INSERT INTO books VALUES(DEFAULT, ?, ?, ?, ?, ?)`;
    const info: OkPacket = await dal.execute(sql, [book.bookName,book.summary,book.genreId,book.price,book.unitsInStock]);
    book.bookId = info.insertId;
    return book;
}

async function deleteBook(bookId: number): Promise<void> {
    const sql = "DELETE FROM books WHERE bookId = ?";
    const info: OkPacket = await dal.execute(sql,[bookId]);
    if(info.affectedRows === 0) throw new ResourceNotFoundError(bookId);
}



export default {
    getAllGenres,
    getAllBooks,
    addBook, 
    deleteBook
};


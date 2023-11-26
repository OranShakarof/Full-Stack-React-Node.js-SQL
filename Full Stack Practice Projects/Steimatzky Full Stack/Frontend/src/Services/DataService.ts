import axios from "axios";
import GenreModel from "../Models/GenreModel";
import appConfig from "../Utils/AppConfig";
import BookModel from "../Models/BookModel";

class DataService {
    public async getAllGenres(): Promise<GenreModel[]> {
        const response = await axios.get<GenreModel[]>(appConfig.genresUrl);
        const genres = response.data;
        return genres;
    }

    public async getAllBooks(): Promise<BookModel[]> {
        const response = await axios.get<BookModel[]>(appConfig.booksUrl);
        const books = response.data;
        return books;
    }

    public async addBook(book: BookModel): Promise<void> {
        await axios.post<BookModel>(appConfig.booksUrl, book);
    }

    
    public async deleteBook(bookId: number): Promise<void> {
        await axios.delete<BookModel>(appConfig.booksUrl + bookId);
    }

}

const dataService = new DataService();

export default dataService;

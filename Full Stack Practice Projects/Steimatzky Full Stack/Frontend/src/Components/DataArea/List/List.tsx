import { useEffect, useState } from "react";
import "./List.css";
import BookModel from "../../../Models/BookModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import BookCard from "../BookCard/BookCard";

function List(): JSX.Element {

    const [books, setBooks] = useState<BookModel[]>([]);

    useEffect(()=>{
        dataService.getAllBooks()
        .then(books => setBooks(books))
        .catch(err => notifyService.error(err));
    },[]);

    async function deleteMe(bookId: number){
        try{
            const sure = window.confirm("Are you sure?");
            if(!sure) return;
            setBooks(books.filter(b => b.bookId !== bookId ));
            notifyService.success("Book deleted Successfully!");
            await dataService.deleteBook(bookId);
        }
        catch(err: any){
            notifyService.error(err);
        }
    }

    return (
        <div className="List">
			{books.map(b => <BookCard key={b.bookId} book={b} deleteMe={deleteMe} />)}
        </div>
    );
}

export default List;

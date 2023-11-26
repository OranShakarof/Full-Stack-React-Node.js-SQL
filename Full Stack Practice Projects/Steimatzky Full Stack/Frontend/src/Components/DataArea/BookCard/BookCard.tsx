import BookModel from "../../../Models/BookModel";
import "./BookCard.css";

interface BookCardProps {
	book: BookModel;
    deleteMe: (bookId: number) => void;
}

function BookCard(props: BookCardProps): JSX.Element {
    
    function deleteMe(){
        props.deleteMe(props.book.bookId);
    }
    
    return (
        <div className="BookCard">
			<button onClick={deleteMe}>❌</button>
			<span>Name: {props.book.bookName}</span>
            <br/><br/>
            <span>Summary: {props.book.summary}</span>
            <br/><br/>
            <span>Genre: {props.book.genreName}</span>
            <br/><br/>
            <span>Price: {props.book.price}</span>
            <br/><br/>
            <span>Stock: {props.book.unitsInStock}</span>
            <br/>
            <span>📔</span>
        </div>
    );
}

export default BookCard;

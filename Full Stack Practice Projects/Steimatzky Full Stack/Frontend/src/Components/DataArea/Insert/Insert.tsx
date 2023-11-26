import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BookModel from "../../../Models/BookModel";
import GenreModel from "../../../Models/GenreModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./Insert.css";

function Insert(): JSX.Element {

    const [genres, setGenres] = useState<GenreModel[]>([]);
    const { register, handleSubmit } = useForm<BookModel>();
    const navigate = useNavigate();

    useEffect(() => {
        dataService.getAllGenres()
        .then(genres => setGenres(genres))
        .catch(err => notifyService.error(err));
    },[]);

    async function send(book: BookModel) {
        try{
            await dataService.addBook(book);
            notifyService.success("Book Added Successfully");
            navigate("/list");
        }
        catch(err: any){
            notifyService.error(err)
        }
    }

    return (
        <div className="Insert">
			<h2>Add Book 📙</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>Name:</label>
                <input type="text" {...register("bookName")} required minLength={2} maxLength={150} />
                
                <label>Summary:</label>
                <input type="text" {...register("summary")} required minLength={10} maxLength={1000} />
                
                <label>Genre:</label>
                <select defaultValue="" {...register("genreId")} required>
                    <option disabled value="">Choose genre..</option>
                    {genres.map(g => <option key={g.genreId} value={g.genreId}>{g.genreName}</option>)}
                </select>
                
                <label>Price:</label>
                <input type="number" step="0.01" {...register("price")} required min="0" max="9999" />

                
                <label>Units In Stock:</label>
                <input type="number" {...register("unitsInStock")} required min="0" max="100" />

                <button>Add</button>
            </form>
        </div>
    );
}

export default Insert;

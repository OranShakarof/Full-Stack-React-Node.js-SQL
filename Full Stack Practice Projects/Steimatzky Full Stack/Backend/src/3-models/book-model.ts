import Joi from "joi";
import { ValidationError } from "./client-errors";


class BookModel{
   public bookId: number;
   public bookName: string;
   public summary: string;
   public genreId: number;
   public price: number;
   public unitsInStock: number; 

    public constructor(book: BookModel){
        this.bookId = book.bookId;
        this.bookName = book.bookName;
        this.summary = book.summary;
        this.genreId = book.genreId;
        this.price = book.price;
        this.unitsInStock = book.unitsInStock;
    }

    public static validationSchema = Joi.object({
        bookId: Joi.number().optional().integer().positive(),
        bookName: Joi.string().required().min(4).max(150),
        summary: Joi.string().required().min(10).max(1000),
        genreId: Joi.number().required().positive().integer().min(1).max(4),
        price: Joi.number().positive().min(0).max(9999),
        unitsInStock: Joi.number().integer().positive().min(0).max(100)
    });

    public validate(){
        const result = BookModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message);
    }

}

export default BookModel;

import { join } from "path";
import { ValidationError } from "./error-models";
import Joi from "joi";
import { UploadedFile } from "express-fileupload";

class ProductModel {
    public id: number;
    public name: string;
    public price: number;
    public stock: number;
    public imageUrl: string;
    public image: UploadedFile;

    public constructor(product: ProductModel){ // Copy constructor
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.stock = product.stock;
        this.imageUrl = product.imageUrl;
        this.image = product.image;
    }

    // Validation Schema build onces - 
    // static will build the schema once and not repeat and build it over and over when we create new object
    private static validationSchema = Joi.object({
        id: Joi.number().optional().integer().positive(),
        name: Joi.string().required().min(2).max(50),
        price: Joi.number().required().min(0).max(1000),
        stock: Joi.number().required().min(0).max(1000).integer(),
        imageUrl: Joi.string().optional().min(40).max(200),
        image: Joi.object().optional()
    });

    // Validate properties and throw it if not valid:
    public validate(): void {
        
        const result = ProductModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message);
    }
}

export default ProductModel;
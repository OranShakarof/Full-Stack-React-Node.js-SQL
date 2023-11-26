import Joi from "joi";
import { ValidationError } from "./client-errors";

class FurnitureModel {

    public furnitureId: number;
    public typeId: number;
    public dimensions: string;
    public color: string;
    public price: number;

    public constructor(furniture: FurnitureModel){
        this.furnitureId = furniture.furnitureId;
        this.typeId = furniture.typeId;
        this.dimensions = furniture.dimensions;
        this.color = furniture.color;
        this.price = furniture.price;
    }


    public static validationSchema = Joi.object({
        furnitureId: Joi.number().optional().integer().positive(),
        typeId: Joi.number().integer().required().min(1).max(4).positive(),
        dimensions: Joi.string().required().min(2).max(50),
        color: Joi.string().required().min(2).max(50),
        price: Joi.number().required().min(0).max(9999),
    });

    public validate(): void {
        const result = FurnitureModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message);
    }


}

export default FurnitureModel;
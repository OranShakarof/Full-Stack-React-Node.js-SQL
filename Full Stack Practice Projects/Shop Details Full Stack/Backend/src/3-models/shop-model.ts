import Joi from "joi";
import { ValidationError } from "./client-errors";

class ShopModel {

    public shopId: number;
    public shopName: string;
    public categoryId: number;
    public address: string;
    
    public constructor (shop: ShopModel){
        this.shopId = shop.shopId;
        this.shopName =shop.shopName;
        this.categoryId = shop.categoryId;
        this.address = shop.address;
    }


    public static validationSchema = Joi.object({
        shopId: Joi.number().optional().integer().positive(),
        shopName: Joi.string().required().min(2).max(100),
        categoryId: Joi.number().positive().integer().required().min(1).max(4),
        address: Joi.string().required().min(2).max(150),
        
    });

    public validate(){
        const result = ShopModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message)
    }

}

export default ShopModel;
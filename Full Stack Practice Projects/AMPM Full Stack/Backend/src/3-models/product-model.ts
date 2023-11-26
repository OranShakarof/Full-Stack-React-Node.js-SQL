import Joi from "joi";
import { ValidationError } from "./client-errors";

class ProductModel {
  public productId: number;
  public productName: string;
  public creationDate: string;
  public expiryDate: string;
  public categoryId: number;
  public price: number;

  public constructor(product: ProductModel) {
    this.productId = product.productId;
    this.productName = product.productName;
    this.creationDate = product.creationDate;
    this.expiryDate = product.expiryDate;
    this.categoryId = product.categoryId;
    this.price = product.price;
  }

  public static validationSchema = Joi.object({
    productId: Joi.number().optional().positive().integer(),
    productName: Joi.string().required().min(2).max(150),
    creationDate: Joi.string().required(),
    expiryDate: Joi.string().required(),
    categoryId: Joi.number().required().positive().integer().min(1).max(4),
    price: Joi.number().positive().min(0).max(9999),
  });

  public validate() {
    const result = ProductModel.validationSchema.validate(this);
    if(result.error?.message) throw new ValidationError(result.error.message);
  }
}

export default ProductModel;

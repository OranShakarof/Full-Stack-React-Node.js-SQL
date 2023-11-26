import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import CategoryModel from "../3-models/category-model";
import ProductModel from "../3-models/product-model";
import { ResourceNotFoundError } from "../3-models/client-errors";

async function getAllCategories(): Promise<CategoryModel[]> {
    const sql = "SELECT * FROM category";
    const categories = await dal.execute(sql);
    return categories;
}

async function getAllProductsByCategory(categoryId: number): Promise<ProductModel[]> {
    const sql = `SELECT * FROM products WHERE categoryId = ${categoryId}`;
    const products = await dal.execute(sql);
    return products;
}

async function addProduct(product: ProductModel): Promise<ProductModel> {
    product.validate();
    const sql = `INSERT INTO products VALUES(DEFAULT, ?, ?, ?, ?, ?)`;
    const info: OkPacket = await dal.execute(sql,[product.productName,product.creationDate,product.expiryDate,product.categoryId,product.price]);
    product.productId = info.insertId;
    return product;
}

async function deleteProduct(productId: number): Promise<void> {
    const sql = `DELETE FROM products WHERE productId = ?`;
    const info: OkPacket = await dal.execute(sql, [productId]);
    if(info.affectedRows === 0) throw new ResourceNotFoundError(productId);
}



export default {
    getAllCategories,
    getAllProductsByCategory,
    addProduct,
    deleteProduct
};


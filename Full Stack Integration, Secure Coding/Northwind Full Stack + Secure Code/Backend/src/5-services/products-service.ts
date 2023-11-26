import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import ProductModel from "../3-models/product-model";
import { ResourceNotFoundError } from "../3-models/error-models";
import appConfig from "../2-utils/app-config";
import imageHelper from "../2-utils/image-helper";

// Get all product
async function getAllProducts(): Promise<ProductModel[]> {
    
    // Create sql:
    const sql = `SELECT 
                    ProductId AS id,
                    ProductName AS name,
                    UnitPrice AS price,
                    UnitsInStock AS stock,
                    CONCAT('${appConfig.domainName}/api/products/', ImageName) AS imageUrl
                FROM products`;
    
    // Get products from database: 
    const products = await dal.execute(sql); // Returns array

    // Return products:?
    return products;
}

async function getOneProduct(id: number): Promise<ProductModel> {
    
    // Create sql:
    const sql = `SELECT 
                    ProductId AS id,
                    ProductName AS name,
                    UnitPrice AS price,
                    UnitsInStock AS Stock,
                    CONCAT('${appConfig.domainName}/api/products/', ImageName) AS imageUrl
                FROM products
                Where ProductId = ${id}`;
    
    // Get products from database containing one product: 
    const products = await dal.execute(sql); // Returns array

    // Extract the single product:
    const product = products[0];

    // If no such product: 
    if(!product) throw new ResourceNotFoundError(id);

    // Return product
    return product;
}

// Add product
async function addProduct(product: ProductModel): Promise<ProductModel> {
    
    // Validate: 
    product.validate();

    // Save Image:
    const imageName = await imageHelper.saveImage(product.image);

    // Create sql:
    const sql = `INSERT INTO products(ProductName,UnitPrice,UnitsInStock,ImageName)
                    VALUES('${product.name}',${product.price},${product.stock},'${imageName}')`;
    
    // Execute sql, get back info object:
    const info: OkPacket = await dal.execute(sql);

    // Extract new id, set it back in the given product:
    product.id = info.insertId;

    // Get image URL: 
    product.imageUrl = `${appConfig.domainName}/api/products/${imageName}`;

    // Remove image from product object because we don't response it back: 
    delete product.image;

    // Return added product: 
    return product;
}

// Update product
async function updateProduct(product: ProductModel): Promise<ProductModel> {
    
    // Validate: 
    product.validate();

    let sql = "";
    let imageName = "";
    const oldImage = await getOldImage(product.id);

    // If client send image to update: 
    if(product.image) {
        imageName = await imageHelper.updateImage(product.image, oldImage);
        sql = `UPDATE products SET ProductName = '${product.name}', UnitPrice = ${product.price},
               UnitsInStock = ${product.stock}, ImageName = '${imageName}' WHERE ProductID = ${product.id}`;
    }

    else {
        imageName = oldImage;
        sql = `UPDATE products SET ProductName = '${product.name}', UnitPrice = ${product.price},
               UnitsInStock = ${product.stock} WHERE ProductID = ${product.id}`;
    }

    
    // Execute sql, get back info object:
    const info: OkPacket = await dal.execute(sql);

    // If product id not exist
    if(info.affectedRows === 0) throw new ResourceNotFoundError(product.id);

    // Get image URL: 
    product.imageUrl = `${appConfig.domainName}/api/products/${imageName}`;

    // Remove image from product object because we don't response it back: 
    delete product.image;

    // Return updated product: 
    return product;
}

// delete product
async function deleteProduct(id: number): Promise<void> {
    
    // Take old image:
    const oldImage = await getOldImage(id);

    // Delete that image:
    await imageHelper.deleteImage(oldImage);

    // Create sql:
    const sql = `DELETE FROM products WHERE ProductID = ${id}`;
    
    // Execute sql, get back info object:
    const info: OkPacket = await dal.execute(sql);
    
    // If product id not exist (can also ignore it)
    if(info.affectedRows === 0) throw new ResourceNotFoundError(id);


}

// Get image name: 
async function getOldImage(id: number): Promise<string> {
    const sql = `SELECT ImageName FROM products WHERE ProductId = ${id}`;
    const products = await dal.execute(sql);
    const product = products[0];
    if(!product) return null;
    const imageName = product.imageName;
    return imageName;
}


export default {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct
};


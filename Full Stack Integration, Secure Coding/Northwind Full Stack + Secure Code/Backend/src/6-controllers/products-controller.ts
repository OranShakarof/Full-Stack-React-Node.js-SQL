import express, { NextFunction, Request, Response } from "express";
import ProductModel from "../3-models/product-model";
import StatusCode from "../3-models/status-code";
import productsService from "../5-services/products-service";
import verifyToken from "../4-middleware/verify-token";
import verifyAdmin from "../4-middleware/verify-admin";
import path from "path";

const router = express.Router();

// GET "http://localhost:4000/api/products"
// router.get("/products",verbose, async (request: Request, response: Response , next: NextFunction) => {
router.get("/products", async (request: Request, response: Response , next: NextFunction) => {
    
    try{
        // Get all products from database: 
        const products = await productsService.getAllProducts();
        
        // Response back all products
        response.json(products);
    }
    catch(err: any){
        next(err);
    }
});

// GET "http://localhost:4000/api/products/:id"
router.get("/products/:id([0-9]+)", async (request: Request, response: Response , next: NextFunction) => {
    
    try{
        // Get route id:
        const id = +request.params.id;
        
        // Get one product from database: 
        const product = await productsService.getOneProduct(id);
        
        // Response back desired product
        response.json(product);
    }
    catch(err: any){
        next(err);
    }
});

// POST "http://localhost:4000/api/products"
router.post("/products", verifyToken ,async (request: Request, response: Response , next: NextFunction) => {

    try{
        // Add image from request.files into request.body
        request.body.image = request.files?.image;
        
        // Get product sent from frontend:
        const product = new ProductModel(request.body);
        
        // add product to database: 
        const addedProduct = await productsService.addProduct(product);
        
        // Response back added products
        response.status(StatusCode.Created).json(addedProduct);
    }
    catch(err: any){
        next(err);
    }
});

// PUT "http://localhost:4000/api/products/:id"
router.put("/products/:id([0-9]+)", verifyToken , async (request: Request, response: Response , next: NextFunction) => {
    
    try{
        // Extract route id into body
        request.body.id = +request.params.id;

        // Add image from request.files into request.body
        request.body.image = request.files?.image;
    
        // Get product sent from frontend:
        const product = new ProductModel(request.body);
        
        // update product to database: 
        const updatedProduct = await productsService.updateProduct(product);
        
        // Response back added products
        response.json(updatedProduct);
    }
    catch(err: any) {
        next(err);
    }
});

// DELETE "http://localhost:4000/api/products/:id"
router.delete("/products/:id([0-9]+)", verifyAdmin ,async (request: Request, response: Response , next: NextFunction) => {
    
    try{
        // Get route id 
        const id = +request.params.id;
        
        // delete product to database: 
        await productsService.deleteProduct(id);
        
        // Response back:
        response.sendStatus(StatusCode.NoContent);
    }
    catch(err: any) {
        next(err);
    }
});

// GET "http://localhost:4000/api/products/:imageName"
router.get("/products/:imageName", async (request: Request, response: Response , next: NextFunction) => {
    
    try{
        // Get image name: 
        const imageName = request.params.imageName;

        // Get image absolute path:
        const absolutePath = path.join(__dirname, "..","1-assets", "images", imageName);

        // Response back image file: 
        response.sendFile(absolutePath);
    }
    catch(err: any){
        next(err);
    }
});


// Export the above route
export default router;
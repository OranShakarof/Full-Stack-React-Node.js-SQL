import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";
import ProductModel from "../3-models/product-model";
import { OkPacket } from "mysql";
import StatusCode from "../3-models/status-code";

const router = express.Router();

router.get("/categories", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categories = await dataService.getAllCategories();
        response.json(categories);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/products-by-category/:categoryId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const categoryId = +request.params.categoryId;
        const products = await dataService.getAllProductsByCategory(categoryId);
        response.json(products);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const product = new ProductModel(request.body);
        const addedProduct = await dataService.addProduct(product);
        response.status(StatusCode.Created).json(addedProduct);
    }
    catch(err: any) {
        next(err);
    }
});


router.delete("/products/:productId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const productId = +request.params.productId;
        await dataService.deleteProduct(productId);
        response.status(StatusCode.NoContent);
    }
    catch(err: any) {
        next(err);
    }
});

export default router;

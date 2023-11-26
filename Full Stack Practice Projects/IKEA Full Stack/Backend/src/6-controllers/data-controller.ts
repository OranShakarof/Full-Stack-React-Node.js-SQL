import express, { Request, Response, NextFunction } from "express";
import dataService from "../5-services/data-service";
import StatusCode from "../3-models/status-code";
import FurnitureModel from "../3-models/furniture-model";

const router = express.Router();

router.get("/furniture", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const furniture = await dataService.getAllFurniture();
        response.json(furniture);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/types", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const types = await dataService.getAllTypes();
        response.json(types);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/furniture", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const furniture = new FurnitureModel(request.body);
        const addedFurniture = await dataService.addFurniture(furniture);
        response.status(StatusCode.Created).json(addedFurniture);
    }
    catch(err: any) {
        next(err);
    }
});




export default router;

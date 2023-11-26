import express, { NextFunction, Request, Response } from "express";
import UserModel from "../3-models/user-model";
import authService from "../5-services/auth-service";
import StatusCode from "../3-models/status-code";
import CredentialsModel from "../3-models/credentials-model";


const router = express.Router();

// POST "http://localhost:4000/api/register"
router.post("/register", async (request: Request, response: Response , next: NextFunction) => {
    
    try{
        // Get User 
        const user  = new UserModel(request.body);
        
        // Add user to data base: 
        const token = await authService.register(user);

        // Response back the token: 
        response.status(StatusCode.Created).json(token);
    }
    catch(err: any){
        next(err);
    }
});

router.post("/login", async (request: Request, response: Response , next: NextFunction) => {
    
    try{
        // Get Credentials 
        const credentials  = new CredentialsModel(request.body);
        
        // Add user to data base: 
        const token = await authService.login(credentials);

        // Response back the token: 
        response.json(token);
    }
    catch(err: any){
        next(err);
    }
});


// Export the above route
export default router;
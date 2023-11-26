import {Request, Response, NextFunction} from "express"
import StatusCode from "../3-models/status-code";
import logger from "../2-utils/logger";
import appConfig from "../2-utils/app-config";

// Catch-All middleware console log everything:
function catchAll(err: any, request: Request, response: Response, next: NextFunction): void{
    
    // On any backend error, this middleware should be executed.

    // Log error on console: 
    console.log("Error: " , err);

    // Take status: 
    const status = err.status || StatusCode.InternalServerError;

    const isCrash = status >= 500 && status <= 599;

    logger.logError(err.message, err);

    // Take message:
    const message =  isCrash && appConfig.isProduction ? "Some error, please try again" : err.message; 

    // Response back the error to the user: 
    response.status(status).send(message);
    
}

export default catchAll;
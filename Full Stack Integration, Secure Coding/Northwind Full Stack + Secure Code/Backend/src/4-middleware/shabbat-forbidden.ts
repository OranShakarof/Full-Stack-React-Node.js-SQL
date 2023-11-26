import {Request, Response, NextFunction} from "express"
import StatusCode from "../3-models/status-code";

// Disallowed entrance only in shabbat:
function shabbat(request: Request, response: Response, next: NextFunction): void{
    
    const day = new Date().getDay();

    if(day === 6){
        response.status(StatusCode.Forbidden).send("The Website closed in Shabbat");
        return;
    }
    // Request containing if the is not shabbat.
    next();
}

export default shabbat;
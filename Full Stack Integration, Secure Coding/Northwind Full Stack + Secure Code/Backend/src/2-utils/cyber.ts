import crypto from "crypto";
import jwt from "jsonwebtoken";
import { ForbiddenError, UnauthorizedError } from "../3-models/error-models";
import RoleModel from "../3-models/role-model";
import UserModel from "../3-models/user-model";

// Token secret key: 
const tokenSecretKey = "The-Amazing-Full-Stack-Students";

function getNewToken(user: UserModel): string {
    
    // Remove password from token: 
    delete user.password;

    // Container for user object inside the token: 
    const container ={ user };

    // Expiration: 
    const options = { expiresIn: "3h" };
    
    // Create token: 
    const token = jwt.sign(container, tokenSecretKey , options);
    
    // Return token: 
    return token;
}

function verifyToken(token: string) {

    if(!token) throw new UnauthorizedError("Missing JWT token.");
    try{
        console.log(jwt.verify(token, tokenSecretKey));
    }
    catch(err: any) {
        throw new UnauthorizedError(err.message);
    }   
}

function verifyAdmin(token: string): void {

    // Verify legal token:
    verifyToken(token);
    
    // Get container 
    const container = jwt.verify(token, tokenSecretKey) as { user : UserModel};

    // Extract user: 
    const user = container.user;

    if(user.roleId !== RoleModel.Admin ) throw new ForbiddenError("You are not admin.");
}


// Hash salt: 
const hashSalt = "MakeThingsGoRight";

//Hash password: 
function hashedPassword(plainText: string): string{
    if(!plainText) return null;

    // Hash with salting: 
    const hashedPassword = crypto.createHmac("sha512", hashSalt).update(plainText).digest("hex");

    return hashedPassword;
}

export default {
    getNewToken,
    verifyToken,
    verifyAdmin,
    hashedPassword
};
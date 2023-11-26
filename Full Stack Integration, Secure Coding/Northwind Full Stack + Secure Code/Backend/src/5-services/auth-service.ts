import { OkPacket } from "mysql";
import UserModel from "../3-models/user-model";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import { UnauthorizedError, ValidationError } from "../3-models/error-models";
import CredentialsModel from "../3-models/credentials-model";
import RoleModel from "../3-models/role-model";

// Register
async function register(user: UserModel): Promise<string> {
    console.log(user);
    
    //Validation:
    user.validate();

    // Set "User" as role: 
    // user.roleId = RoleModel.User;

    // Is username taken:
    if(await isUserNameTaken(user.username)) throw new ValidationError(`username ${user.username} is already exists`);

    user.password = cyber.hashedPassword(user.password);

    // SQL:
    const sql = "INSERT INTO users(firstName,lastName,username,password) VALUES(?,?,?,?)";

    // Execute :
    const info : OkPacket = await dal.execute(sql,[user.firstName, user.lastName, user.username, user.password]);

    // Set Back new Id: 
    user.userId = info.insertId;

    const token = cyber.getNewToken(user);
    
    // Return Token
    return token;

}

// Login
async function login(credentials: CredentialsModel): Promise<string> {
    // Validation: 
    credentials.validate();

    credentials.password = cyber.hashedPassword(credentials.password)

    // SQL: 
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
                 
    // Execute 
    const users = await dal.execute(sql, [credentials.username, credentials.password]);

    const user = users[0];

    // If no such user: 
    if(!user) throw new UnauthorizedError("Incorrect username or password.");

    // Generate JWT: 
    const token = cyber.getNewToken(user);

    // Return token:
    return token;
}

async function isUserNameTaken(username: string): Promise<boolean> {

    // Create sql:
    const sql = `SELECT COUNT(*) AS count FROM users WHERE username = '${username}'` // EXISTS

    const result = await dal.execute(sql);
    const count = result[0].count;
    return count > 0;
}

export default {
    register,
    login
};

import dal from "../2-utils/dal";
import { OkPacket } from "mysql";
import FurnitureModel from "../3-models/furniture-model";
import TypesModel from "../3-models/types-model";

async function getAllFurniture(): Promise<FurnitureModel[]> {
    const sql = "SELECT types.furnitureName, furniture.furnitureId, furniture.typeId, furniture.dimensions, furniture.color, furniture.price FROM furniture INNER JOIN types ON furniture.typeId = types.typeId";
    const furniture = await dal.execute(sql);
    return furniture;
}

async function getAllTypes(): Promise<TypesModel[]> {
    const sql = "SELECT * FROM types";
    const types = await dal.execute(sql);
    return types;
}



async function addFurniture(furniture: FurnitureModel): Promise<FurnitureModel> {
    furniture.validate();
    const sql = "INSERT INTO furniture VALUES(DEFAULT, ?, ?, ?, ?)";
    const info: OkPacket= await dal.execute(sql, [furniture.typeId,furniture.dimensions,furniture.color,furniture.price]);
    furniture.furnitureId = info.insertId;
    return furniture;
}


export default {
    getAllFurniture,
    getAllTypes,
    addFurniture
};


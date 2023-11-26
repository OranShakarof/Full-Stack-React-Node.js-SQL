import dal from "../2-utils/dal";
import { OkPacket } from "mysql";
import CategoryModel from "../3-models/category-model";
import ShopModel from "../3-models/shop-model";

async function getAllCategories(): Promise<CategoryModel[]> {
    const sql = "SELECT * FROM categories";
    const categories = await dal.execute(sql);
    return categories;
}

async function getAllShops(): Promise<ShopModel[]> {
    const sql = "SELECT shops.shopId, shops.shopName, categories.categoryName, shops.address FROM `shops` LEFT JOIN categories ON shops.categoryId = categories.categoryId;";
    const shops = await dal.execute(sql);
    return shops;
}

async function addShop(shop: ShopModel): Promise<ShopModel> {
    shop.validate();
    const sql = "INSERT INTO shops VALUES(DEFAULT, ?, ?, ?)";
    const info: OkPacket = await dal.execute(sql,[shop.shopName,shop.categoryId,shop.address]);
    shop.shopId = info.insertId;
    return shop;
}


export default {
    getAllCategories,
    getAllShops,
    addShop
};


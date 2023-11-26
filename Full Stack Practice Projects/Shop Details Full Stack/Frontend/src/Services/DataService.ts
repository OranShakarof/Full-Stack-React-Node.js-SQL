import axios from "axios";
import ShopModel from "../Models/ShopModel";
import appConfig from "../Utils/AppConfig";
import CategoryModel from "../Models/CategoryModel";
import AddedShopModel from "../Models/AddedShopModel copy";

class DataService {
    public async getAllShops(): Promise<ShopModel[]> {
        const response = await axios.get<ShopModel[]>(appConfig.shopsUrl);
        const shops = response.data;
        return shops
    }

    public async getAllCategories(): Promise<CategoryModel[]> {
        const response = await axios.get<CategoryModel[]>(appConfig.categoriesUrl);
        const categories = response.data;
        return categories
    }

    public async addShop(shop: AddedShopModel): Promise<void> {
        await axios.post<AddedShopModel>(appConfig.shopsUrl, shop);
    }
}

const dataService = new DataService();

export default dataService;

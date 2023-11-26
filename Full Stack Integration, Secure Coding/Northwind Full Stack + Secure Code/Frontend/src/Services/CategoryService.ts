import axios from "axios";
import CategoryModel from "../Models/CategoryModel";
import appConfig from "../Utils/AppConfig";
import { authStore } from "../Redux/AuthState";

class CategoryService{

    // Get all categories
    public async getAllCategories(): Promise<CategoryModel[]> {

        // // Header Containing JWT token:
        // const options = {
        //     headers : { "Authorization" : "Bearer " + authStore.getState().token}
        // };

        //Get response from backend
        const response = await axios.get<CategoryModel[]>(appConfig.categoriesUrl);

        // Extract all categories
        const categories = response.data;

        // Return:
        return categories;
    }

    public async getOneCategory(id: number): Promise<CategoryModel>{

        const response = await axios.get<CategoryModel>(appConfig.categoriesUrl + id);

        const category = response.data;

        return category;

    }
}

const categoryService = new CategoryService();

export default categoryService;
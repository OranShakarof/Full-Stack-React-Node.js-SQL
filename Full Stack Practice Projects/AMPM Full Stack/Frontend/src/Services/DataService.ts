import axios from "axios";
import CategoryModel from "../Models/CategoryModel";
import appConfig from "../Utils/AppConfig";
import ProductModel from "../Models/ProductModel";

class DataService {
    public async getAllCategories(): Promise<CategoryModel[]> {
        const response = await axios.get<CategoryModel[]>(appConfig.categoriesUrl);
        const categories = response.data;
        return categories;
    }

    public async getAllProductsByCategory(categoryId: number): Promise<ProductModel[]> {
        const response = await axios.get<ProductModel[]>(appConfig.productsByCategoryUrl + categoryId);
        const products = response.data;
        return products;
    }

    public async addProduct(product: ProductModel): Promise<void> {
        await axios.post<ProductModel>(appConfig.productsUrl, product);
    }

    public async deleteProduct(productId: number): Promise<void>{
        await axios.delete<ProductModel>(appConfig.productsUrl + productId);
    }
    
}

const dataService = new DataService();

export default dataService;

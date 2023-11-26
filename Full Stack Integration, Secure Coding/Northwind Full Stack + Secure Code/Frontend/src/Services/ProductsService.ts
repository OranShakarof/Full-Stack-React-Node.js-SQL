import axios from "axios";
import ProductModel from "../Models/ProductModel";
import appConfig from "../Utils/AppConfig";
import { ProductsAction, ProductsActionType, productsStore } from "../Redux/ProductsState";

class ProductsService {
    //Get all products from the backend
    public async getAllProducts(): Promise<ProductModel[]> {
        
        // Get products from global state:
        let products = productsStore.getState().products;

        // If there are no products in global state:
        if(products.length === 0){

            //Get all products into response object:
            const response = await axios.get<ProductModel[]>(appConfig.productsUrl)

            //Extract the products from the response 
            products = response.data;

            // Save product in global state:
            const action: ProductsAction = {type: ProductsActionType.SetProducts, payload: products}; 
            productsStore.dispatch(action);

        }

        // Return product;
        return products;
    }

    public async getOneProduct(id: number): Promise<ProductModel>{

        // Get products from global state:
        let products = productsStore.getState().products;

        // Find  desired product: 
        let product = products.find(p => p.id === id);

        // If product not found:
        if(!product) {
            // Get one product into response object
            const response = await axios.get<ProductModel>(appConfig.productsUrl + id);

            //Extract Product from the response 
            product = response.data;

        }

        // Return product:
        return product;

    }

    // Add new Product to backend: 
    public async addProduct(product: ProductModel): Promise<void>{
        
        // Header is a additional data sent in the request for configuration.
        const options = {
            headers : {"Content-Type" : "multipart/form-data"} // Include files in the request.    
        };
            
        // Send product to backend:
        const response = await axios.post<ProductModel>(appConfig.productsUrl, product,options);

        // Extract the added product sent back from the backend:
        const addedProduct = response.data;

        // Add added product to global state:
        const action: ProductsAction = {type: ProductsActionType.AddProduct, payload: addedProduct};
        productsStore.dispatch(action);
        
    }

    // Add new Product to backend: 
    public async updateProduct(product: ProductModel): Promise<void>{
        
        // Header is a additional data sent in the request for configuration.
        const options = {
            headers : {"Content-Type" : "multipart/form-data"} // Include files in the request.    
        };
            
        // Send product to backend:
        const response = await axios.put<ProductModel>(appConfig.productsUrl + product.id, product,options);

        // Extract the updated product sent back from the backend:
        const updatedProduct = response.data;

        // Add added product to global state:
        const action: ProductsAction = {type: ProductsActionType.UpdateProduct, payload: updatedProduct};
        productsStore.dispatch(action);
        
    }

    // Delete Product from backend:
    public async deleteProduct(id: number): Promise<void> {

        // Delete the product in the backend:
        await axios.delete(appConfig.productsUrl + id);

        const action: ProductsAction = {type: ProductsActionType.DeleteProduct, payload: id};
        productsStore.dispatch(action);
    } 

    // Clear Global State
    public clearAllProducts(): void {
        const action: ProductsAction = {type: ProductsActionType.ClearAll};
        productsStore.dispatch(action);
    }
}

const productsService = new ProductsService(); // Singleton

export default productsService;
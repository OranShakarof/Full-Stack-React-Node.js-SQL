class AppConfig {
    public categoriesUrl = "http://localhost:4000/api/categories/";
    public productsUrl = "http://localhost:4000/api/products/";
    public productsByCategoryUrl = "http://localhost:4000/api/products-by-category/";
}

const appConfig = new AppConfig();

export default appConfig;

class AppConfig {
    public readonly productsUrl = "http://localhost:4000/api/products/"; // Ending /
    public readonly employeesUrl ="http://localhost:4000/api/employees/";
    public readonly registerUrl = "http://localhost:4000/api/register/";
    public readonly loginUrl ="http://localhost:4000/api/login/";
    public  readonly categoriesUrl = "http://localhost:4000/api/categories/";
}

// Singleton - אובייקט אחד ויחיד שמשרת את כל האפליקציה ואיאפשר ליצור אובייקט נוסף מבחוץ
const appConfig = new AppConfig();

export default appConfig;
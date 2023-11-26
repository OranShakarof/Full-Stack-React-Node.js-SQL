class AppConfig{
    public readonly port = process.env.PORT;
    public readonly mysqlHost = process.env.DB_HOST;
    public readonly mysqlUser = process.env.DB_USER;
    public readonly mysqlPassword = process.env.DB_PASSWORD;
    public readonly mysqlDatabase = process.env.DB_NAME;
    public readonly domainName = `http://localhost:${this.port}`;
    public readonly origin = process.env.ORIGIN;

}

class DevelopmentConfig extends AppConfig {
    public isDevelopment = true;
    public isProduction = false;
}

class ProductionConfig extends AppConfig {
    public isDevelopment = false;
    public isProduction = true;
}


const appConfig = (process.env.NODE_ENV === "production") ? new ProductionConfig() : new DevelopmentConfig();

export default appConfig;
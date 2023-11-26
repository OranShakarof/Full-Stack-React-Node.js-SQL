import axios from "axios";
import FurnitureModel from "../Models/FurnitureModel";
import appConfig from "../Utils/AppConfig";
import TypesModel from "../Models/TypesModel";

class DataService {
    public async getAllFurniture(): Promise<FurnitureModel[]> {
        const response = await axios.get<FurnitureModel[]>(appConfig.furnitureUrl);
        const furniture = response.data;
        return furniture;
    }

    public async getAllTypes(): Promise<TypesModel[]> {
        const response = await axios.get<TypesModel[]>(appConfig.typesUrl);
        const types = response.data;
        return types;
    }

    public async addFurniture(furniture: FurnitureModel): Promise<void> {
        await axios.post<FurnitureModel>(appConfig.furnitureUrl, furniture);
    }



    
}

const dataService = new DataService();

export default dataService;

import axios from "axios";
import EmployeeModel from "../Models/EmployeeModel";
import appConfig from "../Utils/AppConfig";

class EmployeesService {
    // Get all employees from the backend
    public async getAllEmployees(): Promise<EmployeeModel[]> {

        // Get all the employees to response
        const response = await axios.get<EmployeeModel[]>(appConfig.employeesUrl);
        
        // Extract the employees from the response:
        const employees = response.data;

        // Return Employees
        return employees;
    }

}

const employeesService = new EmployeesService();

export default employeesService;
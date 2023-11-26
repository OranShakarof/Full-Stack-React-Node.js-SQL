import { useEffect, useState } from "react";
import "./EmployeeList.css";
import EmployeeModel from "../../../Models/EmployeeModel";
import employeesService from "../../../Services/EmployeesService";
import useTitle from "../../../Utils/UseTitle";
import notifyService from "../../../Services/NotifyService";

function EmployeeList(): JSX.Element {
    
    useTitle("Northwind | Employees");

    const [frontendEmployees, setFrontendEmployees] = useState<EmployeeModel[]>([]);  
    
    useEffect(() => {
        employeesService.getAllEmployees()
        .then(backendEmployees => setFrontendEmployees(backendEmployees))
        .catch(err => notifyService.error(err));

    });
    
    return (
        <div className="EmployeeList">
            <table>
                <thead>
                    <tr>
                        <th>First Name:</th>
                        <th>Last Name:</th>
                        <th>Title:</th>
                        <th>Country:</th>
                        <th>City:</th>
                        <th>Birth Date:</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {frontendEmployees.map(e => 
                    <tr key={e.id}>
                        <td>{e.firstName}</td>
                        <td>{e.lastName}</td>
                        <td>{e.title}</td>
                        <td>{e.country}</td>
                        <td>{e.city}</td>
                        <td>{e.birthDate}</td>
                        <td><img src={"http://localhost:3030/api/employees/images/"+e.imageName}/></td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;

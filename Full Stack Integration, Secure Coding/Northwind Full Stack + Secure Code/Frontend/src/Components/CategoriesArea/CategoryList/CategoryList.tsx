import { useEffect, useState } from "react";
import "./CategoryList.css";
import CategoryModel from "../../../Models/CategoryModel";
import categoryService from "../../../Services/CategoryService";
import notifyService from "../../../Services/NotifyService";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import appConfig from "../../../Utils/AppConfig";

function CategoryList(): JSX.Element {
    
    const [categories, setCategories]  = useState<CategoryModel[]>([]);
    const navigate = useNavigate();

    useEffect( () => {
        categoryService.getAllCategories()
        .then(categories => {
            setCategories(categories)})
        .catch(err => {
            notifyService.error(err)
            if(err.response.status === 401) navigate("/login");
            });

    })
    
    return (
        <div className="CategoryList">
			<table> 
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(c => 
                    <tr key={c.id}>
                        <td>{c.name}</td>
                        <td>{c.description}</td>
                        <td><img src={appConfig.categoriesUrl + "/images/" +c.imageName}/></td>
                        <td> 
                            <NavLink to={"categories/details/" + c.id}>🕵🏽</NavLink>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CategoryList;

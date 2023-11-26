import { NavLink, useParams } from "react-router-dom";
import "./CategoryDetails.css";
import { useEffect, useState } from "react";
import CategoryModel from "../../../Models/CategoryModel";
import categoryService from "../../../Services/CategoryService";
import notifyService from "../../../Services/NotifyService";
import appConfig from "../../../Utils/AppConfig";

function CategoryDetails(): JSX.Element {

    const params = useParams();
    const id = +params.catId;
    

    const [category, setCategory] = useState<CategoryModel>();

    useEffect(() => {

        categoryService.getOneCategory(id)
        .then(category => setCategory(category))
        .catch(err => notifyService.error(err));
        
    },[]);

    return (
        <div className="CategoryDetails">
			<h2>Category Details:</h2>

            <h3>Name: {category?.name}</h3>
            <h3>Description: {category?.description}</h3>
            <br/>

            <img src={appConfig.categoriesUrl + category?.imageName} />
            <br/><br/>

            <NavLink to="/categories">Back</NavLink>
        </div>
    );
}

export default CategoryDetails;

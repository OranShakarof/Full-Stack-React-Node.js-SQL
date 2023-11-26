import { useEffect, useState } from "react";
import "./Insert.css";
import CategoryModel from "../../../Models/CategoryModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import { useForm } from "react-hook-form";
import AddedShopModel from "../../../Models/AddedShopModel copy";
import { useNavigate } from "react-router-dom";

function Insert(): JSX.Element {

    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const { register, handleSubmit } = useForm<AddedShopModel>();
    const navigate = useNavigate();

    useEffect(() => {
        dataService.getAllCategories()
        .then(categories => setCategories(categories))
        .catch(err => notifyService.error(err));
    },[]);

    async function send(shop: AddedShopModel){
        try{
            await dataService.addShop(shop);
            notifyService.success("Shop Added Successfully"); 
            navigate("/list");
        }
        catch(err: any){
            notifyService.error(err);
        }
    }

    return (
        <div className="Insert">
			<h2>Add Shop</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>Choose Category: </label>
                <select defaultValue="" {... register("categoryId")} required >
                    <option disabled value="">Choose Shop Category</option>
                    {categories.map(c => <option key={c.categoryId} value={c.categoryId}> {c.categoryName} </option>)}
                </select>

                <label>Name:</label>
                <input type="text" {... register("shopName")} required minLength={2} maxLength={100}/>

                <label>Address:</label>
                <input type="text" {... register("address")} required minLength={2} maxLength={150} />

                <button>Add</button>
            </form>
        </div>
    );
}

export default Insert;

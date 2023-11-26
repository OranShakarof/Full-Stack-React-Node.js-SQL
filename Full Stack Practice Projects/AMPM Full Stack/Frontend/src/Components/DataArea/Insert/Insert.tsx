import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CategoryModel from "../../../Models/CategoryModel";
import ProductModel from "../../../Models/ProductModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./Insert.css";

function Insert(): JSX.Element {

    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const { register, handleSubmit } = useForm<ProductModel>();
    const navigate = useNavigate();

    useEffect(() =>{
        dataService.getAllCategories()
        .then(categories => setCategories(categories))
        .catch(err => notifyService.error(err))
    },[]);

    async function send(product: ProductModel) {
        try{
            await dataService.addProduct(product);
            notifyService.success("Product Added Successfully");
            navigate("/list");
        }
        catch(err){
            notifyService.error(err);
        }
    }

    return (
        <div className="Insert">
			<h2>Add New Product</h2>

            <form onSubmit={handleSubmit(send)}>
                <label>Product Name:</label>
                <input type="text" {...register("productName")} required minLength={2} maxLength={150} />

                
                <label>Creation Date:</label>
                <input type="datetime-local" {...register("creationDate")} required />

                
                <label>Expiry Date:</label>
                <input type="datetime-local" {...register("expiryDate")} required />

                
                <label>Category:</label>
                <select defaultValue="" {...register("categoryId")} required>
                    <option disabled value="">Select Category</option>
                    {categories.map(c => <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>)}
                </select>

                
                <label>Product Price:</label>
                <input type="number" step="0.01" {...register("price")} required min="0" max="9999" />

                <button>Add</button>

            </form>

        </div>
    );
}

export default Insert;

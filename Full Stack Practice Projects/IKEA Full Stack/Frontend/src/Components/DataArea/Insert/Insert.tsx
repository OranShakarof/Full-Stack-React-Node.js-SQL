import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FurnitureModel from "../../../Models/FurnitureModel";
import TypesModel from "../../../Models/TypesModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./Insert.css";

function Insert(): JSX.Element {

    const [types, setTypes] = useState<TypesModel[]>([]);
    const { register, handleSubmit} = useForm<FurnitureModel>();
    const navigate = useNavigate();

    useEffect(() => {
        dataService.getAllTypes()
        .then(t => setTypes(t))
        .catch(err => notifyService.error(err));
    },[]);

    async function send(furniture: FurnitureModel){
        try{
            await dataService.addFurniture(furniture);
            notifyService.success("Furniture Added Successfully");
            navigate("/list");
        }
        catch(err){
            notifyService.error(err);
        }
    }

    return (
        <div className="Insert">
			<h2>Add Furniture</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>Select Furniture Type:</label>
                <select defaultValue="" {...register("typeId")} required>
                    <option disabled value="">Select Furniture Type</option>
                    {types.map(t => <option key={t.typeId} value={t.typeId}>{t.furnitureName}</option>)}
                </select>
                <label>Dimensions:</label>
                <input type="text" {...register("dimensions")} required minLength={2} maxLength={50}/>
                
                <label>Color:</label>
                <input type="text" {...register("color")} required minLength={2} maxLength={50}/>

                <label>Price:</label>
                <input type="number" step="0.01" {...register("price")} required min="0" max="9999"/>

                <button>Add</button>
            </form>
        </div>
    );
}

export default Insert;

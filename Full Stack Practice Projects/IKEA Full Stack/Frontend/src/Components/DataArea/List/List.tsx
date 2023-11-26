import { useEffect, useState } from "react";
import "./List.css";
import FurnitureModel from "../../../Models/FurnitureModel";
import notifyService from "../../../Services/NotifyService";
import dataService from "../../../Services/DataService";
import FurnitureCard from "../FurnitureCard/FurnitureCard";

function List(): JSX.Element {
    
    const [furniture, setFurniture] = useState<FurnitureModel[]>([]);

    useEffect(() =>{
        dataService.getAllFurniture()
        .then(furniture => setFurniture(furniture))
        .catch(err => notifyService.error(err))
    })
    
    return (
        <div className="List">
			<h2>Furniture List</h2>
            {furniture.map(f => <FurnitureCard key={f.furnitureId} furniture={f}/>)}
        </div>
    );
}

export default List;

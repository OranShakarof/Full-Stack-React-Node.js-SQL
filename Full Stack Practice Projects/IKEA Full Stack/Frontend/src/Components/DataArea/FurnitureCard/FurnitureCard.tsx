import { useEffect, useState } from "react";
import FurnitureModel from "../../../Models/FurnitureModel";
import "./FurnitureCard.css";
import TypesModel from "../../../Models/TypesModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";

interface FurnitureCardProps{
    furniture: FurnitureModel;
}

function FurnitureCard(props: FurnitureCardProps): JSX.Element {
    const [types, setTypes] = useState<TypesModel[]>([]);

    useEffect(()=>{
        dataService.getAllTypes()
        .then(types => setTypes(types))
        .catch(err => notifyService.error(err))
    },[])
    
    const typeName = types.find(t => t.typeId === props.furniture.typeId);

    return (
        <div className="FurnitureCard">
                <span>Name: {typeName ? typeName.furnitureName : props.furniture.typeId}</span>
                <br/>
                <span>Dimensions: {props.furniture.dimensions}</span>
                <br/>
                <span>color: {props.furniture.color}</span>
                <br/>
                <span>Price: {props.furniture.price}</span>
        </div>
    );
}

export default FurnitureCard;

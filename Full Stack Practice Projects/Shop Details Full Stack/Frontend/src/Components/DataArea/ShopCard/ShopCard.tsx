import ShopModel from "../../../Models/ShopModel";
import "./ShopCard.css";

interface ShopCardProps{
    shop: ShopModel;
}

function ShopCard(props: ShopCardProps): JSX.Element {
    
    return (
        <div className="ShopCard">
            <span>Shop Name: {props.shop.shopName}</span>
            <br/><br/>
            <span>Shop Category: {props.shop.categoryName}</span>
            <br/><br/>
            <span>Address: {props.shop.address}</span>
			
        </div>
    );
}

export default ShopCard;

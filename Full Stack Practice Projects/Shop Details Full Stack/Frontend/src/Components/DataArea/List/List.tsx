import { useEffect, useState } from "react";
import "./List.css";
import ShopModel from "../../../Models/ShopModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import ShopCard from "../ShopCard/ShopCard";

function List(): JSX.Element {

    const [shops, setShops] = useState<ShopModel[]>([]);

    useEffect(()=>{
        dataService.getAllShops()
        .then(shops => setShops(shops))
        .catch(err => notifyService.error(err));
    },[])

    return (
        <div className="List">
			<h2>Our Shops:</h2>
            {shops.map(s => <ShopCard key={s.shopId} shop={s} />)}

        </div>
    );
}

export default List;

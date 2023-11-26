import { useEffect, useState } from "react";
import { productsStore } from "../../../Redux/ProductsState";
import "./TotalProducts.css";
import { unsubscribe } from "diagnostics_channel";

function TotalProducts(): JSX.Element {

    const [count, setCount] = useState<number>();

    useEffect(() => {
        setCount(productsStore.getState().products.length);

        // Subscribe to changes in the global state:
        const unsubscribe = productsStore.subscribe(() => {
            // Update local state with the correct data.
            setCount(productsStore.getState().products.length);
        });

        return () => unsubscribe();
    },[]);


    if(count === 0) return null;

    return (
        <div className="TotalProducts">
			<span>Total Products: {count}</span>
        </div>
    );
}

export default TotalProducts;

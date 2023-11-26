import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import notifyService from "../../../Services/NotifyService";
import productsService from "../../../Services/ProductsService";
import useTitle from "../../../Utils/UseTitle";
import Spinner from "../../SharedArea/Spinner/Spinner";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductsList.css";

function ProductsList(): JSX.Element {
     
    useTitle("Northwind | Products");
    const navigate = useNavigate();

    const [frontendProducts, setFrontendProducts] = useState<ProductModel[]>([]);
    
    // Go to backend once:
    useEffect(() => {

        productsService.getAllProducts()
        .then(backendProducts => setFrontendProducts(backendProducts))
        .catch(err=> notifyService.error(err));
    },[]);

    // Remove All Product from the global state.
    function clearAll(){
        productsService.clearAllProducts();
        setFrontendProducts([]);
        navigate("/home");
        notifyService.success("All products has been clear.");
    }

    return (
        <div className="ProductsList">

            <NavLink to="/products/new">🆕</NavLink>

            <button onClick={clearAll} className="Up">🧼</button>

            {frontendProducts.length === 0 && <Spinner/>}

            {frontendProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
    );
}

export default ProductsList;

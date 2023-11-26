import { ChangeEvent, useEffect, useState } from "react";
import CategoryModel from "../../../Models/CategoryModel";
import ProductModel from "../../../Models/ProductModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import ProductCard from "../ProductCard/ProductCard";
import "./List.css";
import { useNavigate } from "react-router-dom";

function List(): JSX.Element {

    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [products, setProducts] = useState<ProductModel[]>([]);
    
    useEffect(()=>{
       dataService.getAllCategories()
       .then(categories => setCategories(categories))
       .catch(err => notifyService.error(err)) ;
       
    },[]);

    async function displayProducts(args: ChangeEvent<HTMLSelectElement>){
        try{
            const categoryId = +args.target.value;
            const dbProducts = await dataService.getAllProductsByCategory(categoryId);
            setProducts(dbProducts);
        }
        catch(err){
            notifyService.error(err)
        }
        
    }

    async function deleteMe(productId: number) {
        try{
            const sure = window.confirm("Are you Sure?");
            if(!sure) return;
            setProducts(products.filter(p => p.productId !== productId));
            notifyService.success("Product Deleted Successfully!");
            await dataService.deleteProduct(productId);
        }
        catch(err){
            notifyService.error(err);
        }
    }

    return (
        <div className="List">
			<label>Select Category:</label>
            <select defaultValue="" onChange={displayProducts}>
                <option disabled value="">Select Category</option>
                {categories.map(c => <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>)}
            </select>
            <br/><br/>
            {products.map(p => <ProductCard key={p.productId} product={p} deleteMe={deleteMe} />)}
        </div>
    );
}

export default List;

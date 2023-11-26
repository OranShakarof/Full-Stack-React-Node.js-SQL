import ProductModel from "../../../Models/ProductModel";
import "./ProductCard.css";

interface ProductCardProps{
    product: ProductModel;
    deleteMe: (productId: number) => void;
}

function ProductCard(props: ProductCardProps): JSX.Element {

    function deleteMe() {
        props.deleteMe(props.product.productId);
    }

    return (
        <div className="ProductCard">
            <button onClick={deleteMe}>❌</button>
			<span>Name: {props.product.productName}</span>
            <br/>

            <span>Creation Date: {props.product.creationDate}</span>
            <br/>

            <span>Expiry Date: {props.product.expiryDate}</span>
            <br/>

            <span>Price: {props.product.price}</span>
            <br/>
        </div>
    );
}

export default ProductCard;

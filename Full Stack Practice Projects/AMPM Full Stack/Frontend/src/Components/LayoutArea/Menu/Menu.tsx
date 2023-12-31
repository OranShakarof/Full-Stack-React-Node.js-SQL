import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/home">Home</NavLink>
            <span> | </span>
			<NavLink to="/list">Products List</NavLink>
            <span> | </span>
			<NavLink to="/insert">Add New Product</NavLink>
        </div>
    );
}

export default Menu;

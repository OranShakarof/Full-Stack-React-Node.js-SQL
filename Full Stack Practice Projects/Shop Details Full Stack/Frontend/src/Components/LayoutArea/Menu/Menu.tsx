import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/home">Home</NavLink>
            <span> | </span>
			<NavLink to="/list">Our Shops</NavLink>
            <span> | </span>
			<NavLink to="/insert">Add Shop</NavLink>
        </div>
    );
}

export default Menu;

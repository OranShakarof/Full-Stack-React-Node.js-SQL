import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <h2>IKEA Website</h2>
			<NavLink to="/home">Home</NavLink>
            <span> | </span>
			<NavLink to="/list">Furniture List</NavLink>
            <span> | </span>
			<NavLink to="/insert">Add Furniture</NavLink>
        </div>
    );
}

export default Menu;

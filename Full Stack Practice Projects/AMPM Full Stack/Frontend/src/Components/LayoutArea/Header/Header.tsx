import "./Header.css";
import imageSource from "../../../Assets/Images/HeaderLogo.jpg"

function Header(): JSX.Element {
    return (
        <div className="Header">
			<img src={imageSource}/>
        </div>
    );
}

export default Header;

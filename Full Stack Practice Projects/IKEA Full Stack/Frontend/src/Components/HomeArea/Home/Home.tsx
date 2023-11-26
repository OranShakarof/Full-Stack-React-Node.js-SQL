import "./Home.css";
import imageSource from "../../../Assets/Images/ikea.avif"

function Home(): JSX.Element {
    return (
        <div className="Home">
            <h2>IKEA Shop</h2>
			<img src={imageSource} />
        </div>
    );
}

export default Home;

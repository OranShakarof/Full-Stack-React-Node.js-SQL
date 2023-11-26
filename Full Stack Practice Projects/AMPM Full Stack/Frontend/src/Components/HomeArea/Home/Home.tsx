import "./Home.css";
import imageSource from "../../../Assets/Images/home-pic.jpg"

function Home(): JSX.Element {
    return (
        <div className="Home">
			<img src={imageSource}/>
        </div>
    );
}

export default Home;

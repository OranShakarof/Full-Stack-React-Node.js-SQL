import "./Home.css";
import products1ImageSource from "../../../Assets/images/Products.jpeg"
import products2ImageSource from "../../../Assets/images/Products2.jpeg"
import { useEffect, useState } from "react";
import { log } from "console";
import useTitle from "../../../Utils/UseTitle";
import Clock from "../Clock/Clock";

function Home(): JSX.Element {

    useTitle("Northwind | Home");

    const arrSale2 = useState<string>("");
    const sale2Info = arrSale2[0];
    const setSale2Info = arrSale2[1];

    // Using destructuring assignment
    const [sale3Info, setSale3Info] = useState<string>("") ;

    useEffect(() => {
        setInterval(() => {
            displayCurrentTime();
        },1000);
    },[])
    


    function displaySale1(): void {
        alert("Sale: 50% discount on all candies!");
    }
    
    function displaySale2(): void {
       setSale2Info("Sale: 30% discount on all cheese");
    }

    function displaySale3(): void {
        setSale3Info("Sale: 15% discount on beverages!");
    }
    
    const [time, setCurrentTime] = useState<string>("");
    function displayCurrentTime(): void {
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString());
    }

    const randomNumber = Math.floor(Math.random() * 2) + 1; // 1 or 2

    // Demo for getting desserts form the backend:
    const desserts = [
        {id: 1, name: "Apple Pie", price: 20},
        {id: 2, name: "Eclair" , price: 15},
        {id: 3, name: "Pavlova", price: 25 },
        {id: 4, name: "Cheese Cake" , price: 30},
    ];

    function showAverage(): void {
        const numbers = [11,22,33,44,55];
        let sum = 0;
        for(let i = 0; i < numbers.length -1 ; i++){
            sum+= numbers[i];
        }
        const avg = sum / numbers.length;
        alert("Average: " + avg);
    }

    return (
        <div className="Home">
			<h2>Welcome To Northwind Traders Website!</h2>
            
            {/* First Way: Ternary Operator*/}
            {/* {randomNumber === 1 ? <img src={products1ImageSource}/> : <img src={products2ImageSource}/>} */}

            {/* Second Way: Ternary Operator */}
            {/* <img src={ randomNumber === 1 ? products1ImageSource : products2ImageSource } /> */}
            {/* Third Way: Short Circuit */}
            {randomNumber === 1 && <img src={products1ImageSource}/>}
            {randomNumber === 2 && <img src={products2ImageSource}/>}
            
            <br/>
            <br/>
            
            <p>
                Our Desserts:
                 {desserts.map(d => <span key={d.id}> {d.name} - ₪{d.price}🍧 </span>)}
            </p>
            <hr/>

            <button onClick={displaySale1}>First Sale</button>
            <hr/>

            <button onClick={displaySale2}>Second Sale</button>
            <span>{sale2Info}</span>
            <hr/>
            <button onClick={displaySale3}>Third Sale</button>
            <span>{sale3Info}</span>
            <hr/>
            <button onClick={displayCurrentTime}>Show Current time</button>
            <span>{time}</span>
            <hr/>
            <button onClick={showAverage}>Show Average</button>
            <hr/>

            <Clock format="24h"/>
        </div>
    );
}

export default Home;

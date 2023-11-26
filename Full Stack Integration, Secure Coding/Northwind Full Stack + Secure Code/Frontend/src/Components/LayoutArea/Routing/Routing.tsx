import { Navigate, Route, Routes } from "react-router-dom";
import About from "../../AboutArea/About/About";
import ProductsList from "../../ProductsArea/ProductsList/ProductsList";
import Home from "../../HomeArea/Home/Home";
import Page404 from "../Page404/Page404";
import EmployeeList from "../../EmployeesArea/EmployeeList/EmployeeList";
import ProductDetails from "../../ProductsArea/ProductDetails/ProductDetails";
import AddProduct from "../../ProductsArea/AddProduct/AddProduct";
import EditProduct from "../../ProductsArea/EditProduct/EditProduct";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import CategoryList from "../../CategoriesArea/CategoryList/CategoryList";
import CategoryDetails from "../../CategoriesArea/CategoryDetails/CategoryDetails";
import ContactUs from "../../AboutArea/ContactUs/ContactUs";

function Routing(): JSX.Element {
    return (
            <Routes>
                {/* Register: */}
                <Route path="/register" element={<Register/>} />

                {/* Login: */}
                <Route path="/login" element={<Login/>} />
                
                {/* Home Route: */}
                <Route path="/home" element={<Home/>}/>

                {/* Products Route: */}
                <Route path="/products" element={<ProductsList/>}/>

                {/* Product Details: */}
                <Route path="/products/details/:prodId" element={<ProductDetails />} />

                {/* Add Product: */}
                <Route path="/products/new" element={<AddProduct/> } />

                {/* Edit Product: */}
                <Route path="/products/edit/:prodId" element={<EditProduct/> } />

                {/* Employees Route: */}
                <Route path="/employees" element={<EmployeeList/>}/>

                {/* Categories Route: */}
                <Route path="/categories" element={<CategoryList/>} />

                {/* Categories Details: */}
                <Route path="/categories/details/:catId" element={<CategoryDetails/>} />

                {/* About Route: */}
                <Route path="/about" element={<About/>}/>

                {/* Contact Us: */}
                <Route path="/contact-us" element={<ContactUs/>}/>

                {/* Default Route: */}
                {/* <Route path="/" element={<Home/>}/> */}
                <Route path="/" element={<Navigate to="/home"/>}/>

                {/* Page not found: */}
                <Route path="*" element={<Page404/>}/>
            </Routes>
    );
}

export default Routing;

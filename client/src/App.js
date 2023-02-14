import React, { useEffect, useState } from "react"
import axios from "axios"
import './App.css';
import StorePage from './pages/StorePage';
import CartPage from "./pages/CartPage";
import CheckOutPage from "./pages/CheckOutPage";
import AdminPage from "./pages/AdminPage";

function App() {
  const [cartCount,setCartCount] = useState(0)
    useEffect(()=>{
        axios.get("/cart")
        .then(res=>setCartCount(res.data.length))
    },[])
  return (
    <div className="App">
      <nav>
        Cart:{cartCount}
      </nav>
      <StorePage updateCount={()=>{axios.get("/cart").then(res=>setCartCount(res.data.length))}}></StorePage>
      <hr></hr>
      <CartPage updateCount={()=>{axios.get("/cart").then(res=>setCartCount(res.data.length))}}></CartPage>
      <hr></hr>
      <CheckOutPage></CheckOutPage>
      <hr></hr>
      <AdminPage></AdminPage>
    </div>
  );
}

export default App;

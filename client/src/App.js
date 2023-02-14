import React, { useEffect, useState } from "react"
import axios from "axios"
import './App.css';
import StorePage from './pages/StorePage';
import CartPage from "./pages/CartPage";

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
    </div>
  );
}

export default App;

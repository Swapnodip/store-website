import React, { useEffect, useState } from "react"
import axios from "axios"
import './App.css';
import StorePage from './pages/StorePage';

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
    </div>
  );
}

export default App;

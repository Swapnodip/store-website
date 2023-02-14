import React, { useEffect, useState } from "react";
import axios from "axios";

const CheckOutPage = (props) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    axios.get("/cart").then((res) => setCart(res.data));
  }, []);
  return (
    <div className="CheckOutPage">
      <h3>Number of items: {cart.length}</h3>
      <h3>
        Total amount: {cart.reduce((partialSum, i) => partialSum + i.value, 0)}
      </h3>
      <h4>Are you sure you want to confirm your order?</h4>
      <button onClick={()=>{axios.put("/order",{items:cart,discount:false})}}>Confirm order</button>
      <button>Go back</button>
    </div>
  );
};

export default CheckOutPage;

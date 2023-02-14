import React, { useEffect, useState } from "react";
import axios from "axios";

const CheckOutPage = (props) => {
  const [cart, setCart] = useState([]);
  const [code, setCode] = useState(0);
  const [discount, setDiscount] = useState(false);
  useEffect(() => {
    axios.get("/cart").then((res) => setCart(res.data));
    axios.get("/code").then((res) => setCode(res.data.code));
  }, []);
  return (
    <div className="CheckOutPage">
      <h3>Number of items: {cart.length}</h3>
      <h3>
        Total amount:{" "}
        {cart.reduce((partialSum, i) => partialSum + i.value, 0) *
          (discount ? 0.9 : 1)}
      </h3>
      <h4>
        {code != 0
          ? `Congratulations you are eligible for a special discount. Use the coupon code ${code}`
          : ""}
      </h4>
      <label>Enter coupon code here</label>
      <input id="code_input"></input>
      <button
        onClick={() => {
          let inp = document.getElementById("code_input").value;
          axios
            .put("/code", { code: inp })
            .then((res) => setDiscount(res.data));
        }}
      >
        Use code
      </button>
      <h4>Are you sure you want to confirm your order?</h4>
      <button
        onClick={() => {
          if (cart.length)
            axios.put("/order", { items: cart, discount: discount });
        }}
      >
        Confirm order
      </button>
      <button>Go back</button>
    </div>
  );
};

export default CheckOutPage;

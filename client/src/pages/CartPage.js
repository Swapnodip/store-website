import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = (props) => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/cart").then((res) => setCart(res.data));
  }, []);
  return (
    <div className="CartPage">
      {cart.map((i, k) => (
        <div className="Item" key={k}>
          <strong>{i.name}</strong>
          <span>{i.value}&#8377;</span>
          <button
            className="small_button"
            onClick={() => {
              axios.put("/remove", i).then((res) => {
                setCart(res.data);
              });
              props.updateCount();
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <h3>
        Total amount: {cart.reduce((partialSum, i) => partialSum + i.value, 0)}
      </h3>
      <button
        className="big_button"
        onClick={() => {
          navigate("/checkout");
        }}
      >
        Check out
      </button>
    </div>
  );
};

export default CartPage;

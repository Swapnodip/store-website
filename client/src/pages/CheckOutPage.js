import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckOutPage = (props) => {
  const [cart, setCart] = useState([]);
  const [code, setCode] = useState(0);
  const [discount, setDiscount] = useState(false);
  const navigate = useNavigate();
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
        className="small_button"
        onClick={() => {
          if (cart.length && !discount) {
            let inp = document.getElementById("code_input").value;
            axios
              .put("/code", { code: inp })
              .then((res) => setDiscount(res.data));
          }
        }}
      >
        Use code
      </button>
      {discount && <p className="coupon_alert">Coupon code has been applied</p>}
      {cart.length == 0 && <p className="empty_alert">Cart is empty</p>}
      <h4>Are you sure you want to confirm your order?</h4>
      <button
        className="big_button"
        onClick={() => {
          if (cart.length) {
            axios.put("/order", { items: cart, discount: discount });
            props.updateCount();
            navigate("/exit");
          }
        }}
      >
        Confirm order
      </button>
      <button
        className="big_button"
        onClick={() => {
          navigate("/cart");
        }}
      >
        Return to Cart
      </button>
    </div>
  );
};

export default CheckOutPage;

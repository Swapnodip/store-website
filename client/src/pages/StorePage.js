import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StorePage = (props) => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/items").then((res) => setItems(res.data));
  }, []);
  return (
    <div className="StorePage">
      <div className="store_list">
        {items.map((i, k) => (
          <div className="Item" key={k}>
            <strong>{i.name}</strong>
            <span>{i.value}&#8377;</span>
            <button
              className="small_button"
              onClick={() => {
                axios.put("/cart", i);
                props.updateCount();
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
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

export default StorePage;

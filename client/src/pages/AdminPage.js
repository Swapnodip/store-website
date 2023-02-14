import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [data, setData] = useState({
    "orders": [],
    "codes": [],
    "order_count": 0,
    "sale_count": 0,
    "sale_amount": 0,
    "discount_amount": 0
  });
  useEffect(() => {
    axios.get("/admin").then((res) => setData(res.data));
  }, []);
  //console.log(data);
  return (<div className="AdminPage">
    <ul>
        <li>Total number of orders: {data.order_count}</li>
        <li>Total number of items sold: {data.sale_count}</li>
        <li>Total value of items sold: {data.sale_amount}</li>
        <li>Total amount discounted: {data.discount_amount}</li>
        <li>List of orders:
            <ul>
                {data.orders.map((o,k)=>(<li key={k}>{o.items.map(i=>(i.name+" "))}</li>))}
            </ul>
        </li>
        <li>List of coupon codes:
            <ul>
                {data.codes.map((c,k)=>(<li key={k}>{c}</li>))}
            </ul>
        </li>
    </ul>
    <button onClick={()=>{
        axios.get("/admincode").then(axios.get("/admin").then((res) => setData(res.data)))
    }}>Generate new coupon code</button>
  </div>);
};

export default AdminPage;

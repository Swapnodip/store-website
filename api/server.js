const express = require("express");
const cors = require("cors");

const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cors());

//data store
const n = 5;
const items = [
  { name: "Smartphone", value: 15000 },
  { name: "Laptop", value: 60000 },
  { name: "Tablet", value: 25000 },
  { name: "Smartwatch", value: 5000 },
]; //list of items
var cart = []; //contents of cart
var orders = []; //list of orders
var codes = []; //list of coupon codes
var order_count = 0; //total number of orders
var sale_count = 0; //total number of items sold
var sale_amount = 0; //total value of items sold
var discount_amount = 0; //total savings using coupons

//routes
app.get("/items", async (req, res) => {
  res.send(items);
}); //route to get list of items

app.put("/cart", async (req, res) => {
  cart.push(req.body);
  res.send(cart);
}); //route to add item to cart

app.get("/cart", async (req, res) => {
  res.send(cart);
}); //route to get list of items in cart

app.get("/code", async (req, res) => {
  let code = Math.floor(Math.random() * 1000000);
  while (codes.includes(code)) {
    code = Math.floor(Math.random() * 1000000);
  }
  codes.push(code);
  res.send(code);
}); //route to get a new coupon code

app.put("/code", async (req, res) => {
  let code = req.body;
  if (codes.includes(code)) {
    codes = codes.filter((c) => c != code);
    res.send(true);
  } else {
    res.send(false);
  }
}); //route to use a coupon code

app.get("/ordercount", async (req, res) => {
  res.send(order_count);
}); //route to get count of orders

app.put("/order", async (req, res) => {
  let order = req.body;
  orders.push(order);
  order_count++;
  sale_count = sale_count + order.items.length;
  sale_amount =
    sale_amount +
    order.items.reduce((partialSum, i) => partialSum + i.value, 0) *
      (order.discount ? 0.9 : 1);
  discount_amount =
    discount_amount +
    order.items.reduce((partialSum, i) => partialSum + i.value, 0) *
      (order.discount ? 0.1 : 0);
  res.send(true);
}); //route to place order

app.get("/admin", async (req, res) => {
  let result = {
    orders,
    codes,
    order_count,
    sale_count,
    sale_amount,
    discount_amount,
  };
  res.send(result)
}); //route to get information for admin

//end of routes
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

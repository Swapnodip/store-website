import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import StorePage from "./pages/StorePage";
import CartPage from "./pages/CartPage";
import CheckOutPage from "./pages/CheckOutPage";
import AdminPage from "./pages/AdminPage";
import ExitPage from "./pages/ExitPage";

function App() {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    axios.get("/cart").then((res) => setCartCount(res.data.length));
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Store</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            <li>
              <Link to="/cart">Cart:{cartCount}</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <StorePage
                updateCount={() => {
                  axios
                    .get("/cart")
                    .then((res) => setCartCount(res.data.length));
                }}
              ></StorePage>
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                updateCount={() => {
                  axios
                    .get("/cart")
                    .then((res) => setCartCount(res.data.length));
                }}
              ></CartPage>
            }
          />
          <Route path="/checkout" element={<CheckOutPage></CheckOutPage>} />
          <Route path="/admin" element={<AdminPage></AdminPage>} />
          <Route path="/exit" element={<ExitPage></ExitPage>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

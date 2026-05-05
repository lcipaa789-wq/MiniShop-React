import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import AddProduct from "./pages/AddProduct";
import OrdersHistory from "./pages/OrdersHistory";

function App() {
  const [products, setProducts] = useState([]); //to store products from API
  const [search, setSearch] = useState("");
  //fetch products from API
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch("https://api.escuelajs.co/api/v1/products");

      const data = await res.json();
      setProducts(data);
      // console.log(data);
    };
    fetchProduct();
  }, []);

  return (
    <>
      <div className="app">
        {/* navbar allways visible */}
        <Navbar search={search} setSearch={setSearch} />
        <main className="main-container">
          <Routes>
            <Route
              path="/"
              element={<Home products={products} search={search} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/addProduct"
              element={<AddProduct setProducts={setProducts} />}
            />
            <Route path="/orders" element={<OrdersHistory />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;

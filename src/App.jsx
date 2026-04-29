import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  const [products, setProducts] = useState([]); //to store products from API

  //fetch products from API
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch("https://api.escuelajs.co/api/v1/products");

      const data = await res.json();
      setProducts(data);
      console.log(data);
    };
    fetchProduct();
  }, []);

  return (
    <>
      {/* navbar allways visible */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;

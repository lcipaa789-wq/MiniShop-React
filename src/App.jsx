import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  const [products, setProducts] = useState([]); //to store products from API
  const [cart, setCart] = useState([]); // store cart items
  //fetch products from API
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await res.json();
      setProducts(data);
    };
    fetchProduct();
  }, []);
  //add product to cart
  const addToCart = (product) => {
    const foundProduct = cart.find((i) => i.id === product.id);
    //if product already exist increase quantity
    if (foundProduct) {
      const updateCart = cart.map((i) =>
        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
      );
    } else {
      //add new product with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home products={products} addToCart={addToCart} />}
        />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
    </>
  );
}

export default App;

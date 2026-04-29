import { createContext, useState } from "react";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    const foundProduct = cart.find((i) => i.id === product.id);
    if (foundProduct) {
      const updateCart = cart.map((i) =>
        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  const removeFromCart = (id) => {
    setCart(cart.filter((i) => i.id !== id));
  };
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, total, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

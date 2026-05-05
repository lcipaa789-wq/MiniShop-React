import { createContext, useState } from "react";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  //
  const addToCart = (product) => {
    const foundProduct = cart.find((i) => i.id === product.id);
    if (foundProduct) {
      const updateCart = cart.map((i) =>
        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
      );
      setCart(updateCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    // console.log(cart);
  };
  //

  const removeFromCart = (id) => {
    setCart(cart.filter((i) => i.id !== id));
  };
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const placeOrder = () => {
    if (cart.length === 0) return;
    const newOrder = {
      id: Date.now(),
      items: cart,
      total: total,
      date: new Date().toLocaleString(),
      status: "Pending",
      description: "Your order has been successfully placed ",
      orderNumber: Math.floor(Math.random() * 1000000),
    };

    setOrders([...orders, newOrder]);
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        total,
        cartCount,
        placeOrder,
        orders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

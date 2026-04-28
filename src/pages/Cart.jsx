import React from "react";

const Cart = ({ cart }) => {
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const handleCheckout = () => {};
  return (
    <>
      <div>
        <h1>Cart</h1>
        {cart.length === 0 && <p>Cart is empty</p>}
        {cart.map((i) => (
          <div key={i.id}>
            <h3>{i.title}</h3>
            <p>Price: ${i.price} </p>
            <p>Quantity: {i.quantity} </p>
          </div>
        ))}
        <h2>Total: ${total} </h2>
        <button onClick={() => alert(`Total: ${total}`)}>Checkout</button>
      </div>
    </>
  );
};

export default Cart;

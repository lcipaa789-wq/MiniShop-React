import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router";

const Cart = () => {
  const { cart, removeFromCart, total, placeOrder } = useContext(CartContext);
  console.log(cart);
  const taxes = total * 0.09;
  const finalPrice = total + taxes;
  const sumQuantity = cart.reduce((s, product) => s + product.quantity, 0);
  const navigate = useNavigate();

  return (
    <>
      {cart.length > 0 ? (
        <div className="cart-page">
          <div cart-left>
            <section className="cart-grid">
              {cart.map((product) => (
                <>
                  <article className="cart-card" key={product.id}>
                    <img className="cart-img" src={product.images[0]} />
                    <div className="cart-details">
                      <h3 className="cart-title">{product.title}</h3>
                      <p className="cart-price">${product.price}</p>
                      <p className="cart-quantity">
                        {" "}
                        Quantity: {product.quantity}{" "}
                      </p>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                </>
              ))}
            </section>
          </div>

          <div className="checkout-right">
            <h3>
              Items ({sumQuantity}): ${total.toFixed(2)}
            </h3>
            <h3>Estimated tax: ${taxes.toFixed(2)} </h3>
            <h3>Order total: ${finalPrice.toFixed(2)} </h3>
            <button
              className="checkout-btn"
              onClick={() => {
                placeOrder();
                navigate("/orders");
              }}
            >
              Place your order
            </button>
          </div>
        </div>
      ) : (
        <h1 className="empty-sign">Your cart is empty</h1>
      )}
    </>
  );
};

export default Cart;

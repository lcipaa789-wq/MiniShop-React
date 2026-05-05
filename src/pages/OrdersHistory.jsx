import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const OrdersHistory = () => {
  const { orders } = useContext(CartContext);
  return (
    <>
      <div className="orders-page">
        <h1>Your orders</h1>
        {orders.length === 0 && <p>No orders yet</p>}
        {orders.map((o) => (
          <div className="order-card" key={o.id}>
            <div className="order-header">
              <h3>Order #{o.orderNumber}</h3>
              <span className="order-status">{o.status}</span>
              <p className="order-date">Date: {o.date}</p>
              <p className="order-total">Total: {o.total.toFixed(2)} </p>
              <p className="order-description">{o.description} </p>
              <div className="order-items">
                {o.items.map((i) => (
                  <div key={i.id} className="order-item">
                    <div className="order-item-img">
                      <img src={i.images[0]} alt={i.title} />
                    </div>
                    <div>
                      <h4>{i.title}</h4>
                      <p>Price: {i.price}</p>
                      <p>Quantity: {i.quantity} </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrdersHistory;

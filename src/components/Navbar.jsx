import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { CartContext } from "../context/CartContext";
import { Cart, Plus } from "react-bootstrap-icons";

const Navbar = ({ search, setSearch }) => {
  const { cartCount } = useContext(CartContext);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <h1>
            MiniShop-<span>React</span>
          </h1>
        </Link>
        <Link to="/addProduct" className="add-btn">
          <Plus size={18} /> Add Product
        </Link>
        <Link to="/orders" className="add-btn">
          Orders
        </Link>

        <input
          className="navbar-search"
          type="text"
          placeholder="Search.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link to="/cart " className="navbar-cart">
          <Cart size={25} /> {cartCount}
        </Link>
      </nav>
    </>
  );
};

export default Navbar;

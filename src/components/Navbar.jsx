import React, { useContext } from "react";
import { Link } from "react-router";
import { CartContext } from "../context/CartContext";
import logo from "../images/image.png";

const Navbar = () => {
  const { cartCount } = useContext(CartContext);
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="logo" />
        </Link>
        <Link to="/cart " className="navbar-cart">
          Cart {cartCount}{" "}
        </Link>
      </nav>
    </>
  );
};

export default Navbar;

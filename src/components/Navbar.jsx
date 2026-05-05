import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { CartContext } from "../context/CartContext";
import { Cart, Plus } from "react-bootstrap-icons";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = ({ search, setSearch }) => {
  const { cartCount } = useContext(CartContext);
  const { loginWithRedirect, logout, user } = useAuth0(); //login/logout function
  const { isAuthenticated } = useAuth0();

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
        {!isAuthenticated ? (
          <button
            className="auth-btn login-btn"
            onClick={() => loginWithRedirect()}
          >
            Login
          </button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span className="user-name">{user.email.split("@")[0]}</span>

            <button
              className="auth-btn logout-btn"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Logout
            </button>
          </div>
        )}

        <Link to="/cart " className="navbar-cart">
          <Cart size={25} /> {cartCount}
        </Link>
      </nav>
    </>
  );
};

export default Navbar;

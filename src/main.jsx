import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { CartProvider } from "./context/CartContext.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-6jzh8klbqr3puovr.us.auth0.com"
    clientId="13a122Gs9AYYKDbrs3g1oeG2KFVAmUG5"
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
    ,
  </Auth0Provider>,
);
// BrowserRouter to enable routing
//CartProvider - Context

import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const Home = ({ products }) => {
  const { addToCart } = useContext(CartContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  return (
    <>
      <div className="home">
        <h1>Products:</h1>
        <section className="products-grid">
          {currentProducts.map((product) => (
            <>
              <article className="product-card" key={product.id}>
                <img className="product-img" src={product.images[0]} />
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">${product.price}</p>
                <button
                  className="product-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
              </article>
            </>
          ))}
        </section>
        <div className="pagination">
          {" "}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

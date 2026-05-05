import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { InfoSquare, InfoSquareFill } from "react-bootstrap-icons";

const Home = ({ products, search }) => {
  const { addToCart } = useContext(CartContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectProduct, setSelectProduct] = useState(null);
  const [category, setCategory] = useState("all"); //stores selected categoty
  const [sort, setSort] = useState("default"); //stores selected sorting options
  const itemsPerPage = 12;
  let filteredProducts = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()); //search filter
    const matchCategory = category === "all" || p.category?.name === category; //category filter
    return matchSearch && matchCategory;
  });
  //sort products
  if (sort === "low") {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  }
  if (sort === "high") {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  const pagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  let endPage = startPage + pagesToShow - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - pagesToShow + 1);
  }

  return (
    <>
      <div className="home">
        {/* <h1>Products:</h1> */}
        <div className="filters">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All catefories</option>
            <option value="Clothes">Clothes</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Shoes">shoes</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Default</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        <section className="products-grid">
          {currentProducts.map((product) => (
            <>
              <article className="product-card" key={product.id}>
                <button
                  className="info-btn"
                  onClick={() => setSelectProduct(product)}
                >
                  <InfoSquare size={18} />
                </button>
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
        {selectProduct && (
          <div className="modal-overlay" onClick={() => setSelectProduct(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setSelectProduct(null)}
              >
                ×
              </button>

              <img
                className="modal-img"
                src={selectProduct.images?.[0]}
                alt={selectProduct.title}
              />

              <h2>{selectProduct.title}</h2>
              <p className="modal-price">${selectProduct.price}</p>
              <p className="modal-description">{selectProduct.description}</p>

              <button
                className="product-btn"
                onClick={() => addToCart(selectProduct)}
              >
                Add to cart
              </button>
            </div>
          </div>
        )}

        <div className="pagination">
          {startPage > 1 && <span>...</span>}

          {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const page = startPage + i;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "active" : ""}
              >
                {page}
              </button>
            );
          })}

          {endPage < totalPages && <span>...</span>}
        </div>
      </div>
    </>
  );
};

export default Home;

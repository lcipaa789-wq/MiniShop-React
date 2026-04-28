import React from "react";

const Home = ({ products, addToCart }) => {
  return (
    <>
      <div>
        <h1>Products:</h1>
        {products.map((product) => (
          <>
            <div key={product.id}>
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <img src={product.images[0]} />
              <button onClick={() => addToCart(product)}>Add to cart</button>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Home;

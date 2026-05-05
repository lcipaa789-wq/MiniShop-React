import React, { useState } from "react";

const AddProduct = ({ setProducts }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });
  const [success, setSuccess] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.price || !formData.image.trim()) {
      alert("Please fill all fields");
      return;
    }
    const newProduct = {
      id: Date.now(),
      title: formData.title,
      price: formData.price,
      images: [formData.image],
      description: formData.description,
    };
    setProducts((prev) => [newProduct, ...prev]);
    console.log(newProduct);
    setSuccess(true);
    setFormData({
      title: "",
      price: "",
      image: "",
      description: "",
    });
    setTimeout(() => setSuccess(false), 2000);
  };
  return (
    <>
      {success && <p className="success-message">Product Successfully added</p>}
      <div className="add-product">
        <h1>Add Product</h1>

        <form onSubmit={handleSubmit} className="add-product-form">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
          />
          <label>Price </label>
          <input
            type="number"
            name="price"
            placeholder="Enter Price"
            value={formData.price}
            onChange={handleChange}
          />
          <label>Image</label>
          <input
            type="text"
            name="image"
            placeholder="Enter Image URL"
            value={formData.image}
            onChange={handleChange}
          />
          <label>Description</label>
          <textarea
            name="description"
            id="desctiption"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Product Descriptions"
          ></textarea>
          <button>Add Product</button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;

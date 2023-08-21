import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios.get("http://localhost:8000/products").then((res) => {
      setProducts(res.data);
    });
  };

  const handleDelete = (item) => {
    axios.delete(`http://localhost:8000/product/${item._id}`).then((res) => {
      getProducts();
      alert(`Deleted ${item.name}`);
    });
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      {products.length > 0 ? (
        <>
          <ul>
            <li>S No</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Actions</li>
          </ul>

          {products?.map((item, index) => {
            return (
              <ul>
                <li>{index + 1}</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.category}</li>
                <li>
                  <button className="editBtn">
                    <Link to={`/update/${item._id}`}>Edit</Link>
                  </button>
                  <button
                    className="deleteBtn"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            );
          })}
        </>
      ) : (
        <span>No Products Available</span>
      )}
    </div>
  );
};
export default ProductList;

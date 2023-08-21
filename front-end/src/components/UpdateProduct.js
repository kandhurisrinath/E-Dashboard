import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [values, setValues] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
    userId: JSON.parse(localStorage.getItem("user"))["_id"],
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/product/${id}`).then((res) => {
        setValues(res.data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(values);
    if (!values.name || !values.category || !values.price || !values.company) {
      setError(true);
      return false;
    }
    axios
      .put(
        `http://localhost:8000/product/${id}`,
        { ...values },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        navigate("/");
      });
  };

  return (
    <div className="product">
      <h1>Add Product Component</h1>
      <input
        className="inputBox"
        placeholder="Enter Product Name"
        type="text"
        name="name"
        onChange={handleChange}
        value={values.name}
      />
      {error && !values.name && <span className="error">Enter valid Name</span>}
      <input
        className="inputBox"
        placeholder="Enter Product Price"
        type="text"
        name="price"
        onChange={handleChange}
        value={values.price}
      />
      {error && !values.price && (
        <span className="error">Enter valid Price</span>
      )}
      <input
        className="inputBox"
        placeholder="Enter Product Category"
        type="text"
        name="category"
        onChange={handleChange}
        value={values.category}
      />
      {error && !values.category && (
        <span className="error">Enter valid Category</span>
      )}
      <input
        className="inputBox"
        placeholder="Enter Product Company"
        type="text"
        name="company"
        onChange={handleChange}
        value={values.company}
      />
      {error && !values.company && (
        <span className="error">Enter valid Company</span>
      )}
      <button onClick={handleSubmit} className="appButton">
        {id ? "Update" : "Add"} Product
      </button>
    </div>
  );
};

export default UpdateProduct;

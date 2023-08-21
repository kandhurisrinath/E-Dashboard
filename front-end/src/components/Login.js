import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(data);
    axios
      .post(
        "http://localhost:8000/login",
        { ...data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.name) {
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/");
        } else {
          alert("Please enter correct details");
        }
      });
  };

  return (
    <div className="register">
      <h1>Sign In</h1>
      <input
        value={data?.email}
        className="inputBox"
        type="email"
        name="email"
        placeholder="Enter Email"
        onChange={handleChange}
      />
      <input
        value={data?.password}
        className="inputBox"
        type="password"
        name="password"
        placeholder="Enter Password"
        onChange={handleChange}
      />
      <button className="appButton" type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .post(
        "http://localhost:8000/register",
        { ...data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data) {
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/");
        }
      });
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        value={data?.name}
        className="inputBox"
        type="text"
        name="name"
        placeholder="Enter Name"
        onChange={handleChange}
      />
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

export default SignUp;

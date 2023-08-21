import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div>
      <img
        alt="logo"
        className="logo"
        src="https://business.adobe.com/blog/basics/media_13d29c49b0d019751e3b2989e7f7df941e98fecbc.png?width=750&format=png&optimize=medium"
      />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to={"/"}>Products</Link>
          </li>
          <li>
            <Link to={"/add"}>Add Product</Link>
          </li>
          <li>
            <Link to={"/update"}>Update Product</Link>
          </li>

          <li>
            <Link to={"/profile"}>Profile</Link>
          </li>
          <li>
            <Link to={"/signup"} onClick={logout}>
              Logout ( {JSON.parse(auth).name} )
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul float-right">
          <li>
            <Link to={"/signup"}>SignUp</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;

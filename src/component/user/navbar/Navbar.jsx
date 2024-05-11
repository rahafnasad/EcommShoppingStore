import React, { useContext, useEffect } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contex/Cart";
import { useQuery } from "react-query";
import logo from "../../../../public/logo.png";
import { UserContext } from "../contex/User";
export default function Navbar() {
  let { userToken,setUserToken,userData,setUserData ,loader } = useContext(UserContext);
  
  if(loader&&userToken){
    
    return <div className="spinner-border" role="status">
    <span className="sr-only">Loading...</span>
  </div>
  
  }
  let navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userToken");
   setUserToken(null);
    setUserData(null);
    navigate("/");
  };
  let { count } = useContext(CartContext);
 // const { getProfileInfoContect } = useContext(CartContext);

 // const { data, isLoading } = useQuery("profileInfo", getProfileInfoContect);


  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container">
          <a className="navbar-brand" href="#">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/categories">
                  Categories
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              {userToken && (
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    cart <label className="count rounded-circle">{count}</label>
                  </Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                {!userToken ? 
                <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </a>
                 : 
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                   {userData.userName}
                   <img src={userData.image.secure_url} />
                  </a>
                }

                <ul className="dropdown-menu ">
                  {!userToken ? (
                    <>
                      <li>
                        <Link
                          className="dropdown-item "
                          to="/regiseter"
                        >
                          register
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/login">
                          login
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          profile
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link
                          className="dropdown-item "
                          onClick={logout}
                        >
                          logout
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

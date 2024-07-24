import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import { useState } from 'react';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from '../components/ContextReducer';



export default function Nav(props) {

  const [cartView, setCartView] = useState(false)

  localStorage.setItem('temp', "first")

  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  const data = useCart();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky" 
      style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">Go-Food</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5 mx-3 active" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5 mx-3 active" aria-current="page" to="/myOrder">My Orders</Link>
                </li>
                : ""}
            </ul>
            {(!localStorage.getItem("authToken")) ?
              <form className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
              </form>
              :
              <div>
                <div className="btn bg-white text-success mx-2" onClick={() => { setCartView(true) }} >
                  My Cart {" "}
                  <Badge pill bg="danger"> {data.length} </Badge>
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart/></Modal> : ""}
                <button className="btn bg-white text-danger mx-2" onClick={handleLogout}>Logout</button>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
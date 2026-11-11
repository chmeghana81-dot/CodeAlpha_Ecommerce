import { Link, NavLink } from "react-router-dom";
import {
  FaShoppingCart,
  FaUserCircle,
  FaShippingFast
} from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <div className="announcement-bar">
        <span>
          <FaShippingFast /> FREE SHIPPING ON ORDERS ABOVE ₹999
        </span>
        <span>PREMIUM COLLECTION | NEW ARRIVALS</span>
      </div>

      <nav className="navbar">
        <Link to="/" className="logo">
          <span className="logo-main">
            MEGA<span>STORE</span>
          </span>
          <small>STYLE THAT DEFINES YOU</small>
        </Link>

        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Shop</NavLink>
          <NavLink to="/my-orders">My Orders</NavLink>

          <NavLink to="/login" className="account-link">
            <FaUserCircle /> Login
          </NavLink>

          <NavLink to="/cart" className="cart-link">
            <FaShoppingCart /> Cart
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

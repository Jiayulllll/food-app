import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (event) => {
    event.preventDefault(); // Prevent the default anchor link behavior
    const targetId = event.currentTarget.getAttribute("href").slice(1); // Remove the '#' from the href
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const topOffset = targetElement.offsetTop;
      const navbarOffset = document.querySelector(".navbar").offsetHeight;
      const scrollPosition = topOffset - navbarOffset;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
      setMenu(targetId); // Update the menu state based on the clicked element
    }
  };

  useEffect(() => {
    const unlisten = navigate((location) => {
      if (location.pathname !== location.pathname) {
        window.scrollTo(0, 0);
      }
    });

    return unlisten;
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <Link to="/">
        <img className="logo" src={assets.logo} alt="" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={`${menu === "home" ? "active" : ""}`}
        >
          home
        </Link>
        <a
          href="#menu"
          onClick={handleClick}
          className={`${menu === "menu" ? "active" : ""}`}
        >
          Menu
        </a>
        <a
          href="#map"
          onClick={handleClick}
          className={`${menu === "map" ? "active" : ""}`}
        >
          Delivery Information
        </a>
        <a
          href="#footer"
          onClick={handleClick}
          className={`${menu === "footer" ? "active" : ""}`}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        {/* <img
          src={assets.search_icon}
          alt="Search Icon"
          className="navbar-icon"
        /> */}
        <Link to="/cart" className="navbar-search-icon">
          <img
            src={assets.basket_icon}
            alt="Basket Icon"
            className="navbar-icon"
          />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                {" "}
                <img src={assets.bag_icon} alt="" /> <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                {" "}
                <img src={assets.logout_icon} alt="" /> <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

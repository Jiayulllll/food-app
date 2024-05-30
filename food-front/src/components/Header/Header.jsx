import React from "react";
import "./Header.css";

const Header = () => {
  const handleViewMenuClick = () => {
    const exploreMenuElement = document.getElementById("explore-menu");
    if (exploreMenuElement) {
      exploreMenuElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Explore our varied menu, which offers a delightful selection of dishes
          made with premium ingredients and exceptional culinary skill. We are
          dedicated to fulfilling your cravings and enhancing your dining
          experience with every exquisite meal.
        </p>
        <button onClick={handleViewMenuClick}>View Menu</button>
      </div>
    </div>
  );
};

export default Header;

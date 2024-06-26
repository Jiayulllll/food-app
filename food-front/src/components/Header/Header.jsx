import React from "react";
import "./Header.css";

const Header = () => {
  const handleViewMenuClick = () => {
    const exploreMenuElement = document.getElementById("menu");
    if (exploreMenuElement) {
      exploreMenuElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="header" id="header">
      <div className="header-contents">
        <h2>Have a Delicious Meal with Us</h2>
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

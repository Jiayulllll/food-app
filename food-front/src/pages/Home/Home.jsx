import React, { useState } from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import Map from "../../components/Map/Map";
import "./Home.css";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="explore">
        <ExploreMenu setCategory={setCategory} category={category} />
      </div>
      <FoodDisplay category={category} />
      <Map />
      <AppDownload />
    </div>
  );
};

export default Home;

import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import AddPostcode from "./pages/AddPostcode/AddPostcode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const url = "https://food-app-nm2a.onrender.com";

  return (
    <div className="app">
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List />} url={url} />
          <Route path="/orders" element={<Orders url={url} />} />
          <Route path="/addPostcode" element={<AddPostcode url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

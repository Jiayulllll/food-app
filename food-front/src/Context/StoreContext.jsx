import { createContext, useEffect, useState } from "react";
import { menu_list } from "../assets/assets";
export const StoreContext = createContext(null);
import axios from "axios";

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [ordersData, setOrdersData] = useState({});
  const url = "https://food-app-nm2a.onrender.com";
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const [postcode, setPostcode] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("");

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: token }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData({ token: localStorage.getItem("token") });
      }
    }
    loadData();
  }, []);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const placeOrder = (deliveryData) => {
    console.log(deliveryData);
  };

  const checkPostcode = async () => {
    try {
      const response = await axios.post(url + "/api/deliveryZone/check", {
        postcode,
      });
      setDeliveryMessage(
        response.data.isEligible
          ? "Eligible for delivery"
          : "Not eligible for delivery"
      );
    } catch (error) {
      setDeliveryMessage(error.response?.data?.message || "Error occurred");
    }
  };

  const contextValue = {
    food_list,
    menu_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    placeOrder,
    token,
    setToken,
    url,
    postcode,
    setPostcode,
    checkPostcode,
    deliveryMessage,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

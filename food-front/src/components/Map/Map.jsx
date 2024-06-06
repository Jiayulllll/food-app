// src/components/Map.jsx
import { StoreContext } from "../../Context/StoreContext";
import React, { useContext } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import "./Map.css"; // Importing the CSS for styling

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -37.8136,
  lng: 144.9631,
};

const Map = () => {
  const { postcode, setPostcode, deliveryMessage, checkPostcode } =
    useContext(StoreContext);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <h1 className="address-check-title" id="map">
        Check Your Address
      </h1>
      <p className="map-text">
        Enter your postcode to check if your address is eligible for delivery
      </p>
      <div className="map-container">
        <div className="map-area">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            <Marker position={center} />
            {/* Additional markers or features */}
          </GoogleMap>
        </div>
        <div className="search-area">
          <input
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="Enter postcode"
            className="postcode-input"
          />
          <button onClick={checkPostcode} className="check-button">
            Check
          </button>
          <p className="delivery-message">{deliveryMessage}</p>
        </div>
      </div>
    </LoadScript>
  );
};

export default Map;

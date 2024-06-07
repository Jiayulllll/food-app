import React, { useState, useEffect } from "react";
import "./AddPostcode.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets, url } from "../../assets/assets";

const AddPostcode = () => {
  const [postcodeData, setPostcodeData] = useState({
    postcode: "",
    isEligible: false,
  });
  const [postcode, setPostcode] = useState([]);

  useEffect(() => {
    fetchPostcodes();
  }, []);

  const fetchPostcodes = async () => {
    try {
      const response = await axios.get(`${url}/api/deliveryZone/list-postcode`);
      setPostcode(response.data);
    } catch (error) {
      toast.error("Error fetching postcodes");
    }
  };

  const removePostcode = async (postcode) => {
    const response = await axios.delete(
      `${url}/api/deliveryZone/remove-postcode`,
      {
        data: { postcode },
      }
    );
    await fetchPostcodes();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${url}/api/deliveryZone/add-postcode`,
        postcodeData
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchPostcodes();
        setPostcodeData({ postcode: "", isEligible: false });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding postcode");
    }
  };

  const onChangeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    setPostcodeData({
      ...postcodeData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="add-postcode">
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="postcode">Add Postcode:</label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            value={postcodeData.postcode}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="isEligible"
              checked={postcodeData.isEligible}
              onChange={onChangeHandler}
            />
            Is Eligible
          </label>
        </div>
        <button type="submit" className="submit-btn">
          Add Postcode
        </button>
      </form>
      <div className="postcode-list">
        <h3>Existing Postcodes:</h3>
        <ul>
          {postcode.map((zone, index) => (
            <li key={index}>
              {zone.postcode} - Eligible: {zone.isEligible ? "Yes" : "No"}
              <p
                className="cursor"
                onClick={() => removePostcode(zone.postcode)}
              >
                x
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddPostcode;

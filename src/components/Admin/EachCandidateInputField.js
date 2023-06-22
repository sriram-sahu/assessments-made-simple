import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import "./index.css";
const EachCandidateInputField = ({ onInputChange }) => {
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    phone: "",
    endDate: "",
  });
  const handleInputChange = (field, value) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [field]: value,
    }));
  };
  useEffect(() => {
    onInputChange(inputValues); // Notify the parent component about the input values
  }, [inputValues]); // Empty dependency array to run the effect only once when the component mounts
  console.log(inputValues);
  return (
    <div className="container">
      <div className="bg-each-candidate-field">
        {/* <PersonPinIcon className="input-field" /> */}
        <TextField
          id="outlined-basic-1"
          label="name"
          variant="outlined"
          className="input-field m-1"
          value={inputValues.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          required
        />
        <TextField
          id="outlined-basic-2"
          label="Email"
          variant="outlined"
          className="input-field m-1"
          value={inputValues.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
        />
        <TextField
          id="outlined-basic-3"
          label="Phone"
          variant="outlined"
          className="input-field m-1"
          value={inputValues.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          required
        />
        <TextField
          id="outlined-basic-4"
          type="date"
          variant="outlined"
          className="input-field m-1"
          value={inputValues.endDate}
          onChange={(e) => handleInputChange("endDate", e.target.value)}
          required
        />
        <hr />
        {/* <TextField
          id="standard-basic-2"
          label="Email"
          variant="standard"
          className="input-field"
          value={inputValues.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
        /> */}
        {/* <TextField
          id="standard-basic-3"
          label="Phone"
          variant="standard"
          className="input-field"
          value={inputValues.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          required
        /> */}
        {/* <TextField
          id="standard-basic-4"
          type="date"
          label=""
          variant="standard"
          className="input-field"
          value={inputValues.endDate}
          onChange={(e) => handleInputChange("endDate", e.target.value)}
          required
        /> */}
      </div>
    </div>
  );
};
export default EachCandidateInputField;
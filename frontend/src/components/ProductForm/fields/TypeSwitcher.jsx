import React from "react";
import "./TypeSwitcher.scss";

const TypeSwitcher = ({ onTypeChange }) => {
  return (
    <div className="input-group">
      <label htmlFor="type">Type Switcher</label>
      <select
        id="type"
        name="type"
        className="product-form__select"
        onChange={(e) => onTypeChange(e.target.value)}
        required
      >
        <option value="">--Please choose an option--</option>
        <option value="DVD">DVD</option>
        <option value="Book">DVD</option>
        <option value="Furniture">DVD</option>
      </select>
    </div>
  );
};

export default TypeSwitcher;

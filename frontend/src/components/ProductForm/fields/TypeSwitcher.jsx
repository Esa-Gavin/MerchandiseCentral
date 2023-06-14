import React from "react";
import "./TypeSwitcher.scss";

const TypeSwitcher = ({ onTypeChange }) => {
  return (
    <div className="input-group">
      <label htmlFor="type">Type Switcher</label>
      <select
        id="productType"
        name="type"
        className="product-form__select"
        onChange={(e) => onTypeChange(e.target.value)}
        required
      >
        <option value="">Type Switcher</option>
        <option value="DVD">DVD</option>
        <option value="Book">Book</option>
        <option value="Furniture">Furniture</option>
      </select>
    </div>
  );
};

export default TypeSwitcher;

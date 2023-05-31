import React from "react";
import "./Price.scss";

const Price = ({ value, onChange }) => {
  return (
    <div className="input-group">
      <label htmlFor="price">Price</label>
      <input
        type="number"
        id="price"
        name="price"
        className="product-form__input"
        value={value}
        onChange={onChange}
        min="0"
        required
      />
    </div>
  );
};

export default Price;

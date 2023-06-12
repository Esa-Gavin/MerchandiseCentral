import React from "react";
import "./DVDSize.scss";

const DVDSize = ({ value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  }
  return (
    <div className="input-group">
      <label htmlFor="size">Size (MB)</label>
      <input
        type="number"
        id="size"
        name="size"
        className="product-form__input"
        value={value}
        onChange={handleChange}
        min="0"
        required
      />
    </div>
  );
};

export default DVDSize;

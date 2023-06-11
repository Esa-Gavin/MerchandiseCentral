import React from "react";
import "./Price.scss";

const Price = ({ register }) => {
  return (
    <div className="input-group">
      <label htmlFor="price">Price ($)</label>
      <input
        type="number"
        id="price"
        name="price"
        className="product-form__input"
        {...register('price')}
        min="0"
        required
      />
    </div>
  );
};

export default Price;

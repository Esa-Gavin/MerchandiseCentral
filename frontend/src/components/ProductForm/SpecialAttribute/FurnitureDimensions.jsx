import React from "react";
import "./FurnitureDimensions.scss";

const FurnitureDimensions = ({ values, onChange }) => {
  return (
    <div className="furniture-dimensions">
      <div className="input-group">
        <label htmlFor="height">Height (CM)</label>
        <input
          type="number"
          id="height"
          name="height"
          className="product-form__input"
          value={values.height}
          onChange={onChange}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="width">Width (CM)</label>
        <input
          type="number"
          id="width"
          name="width"
          className="product-form__input"
          value={values.width}
          onChange={onChange}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="length">Width (CM)</label>
        <input
          type="number"
          id="length"
          name="length"
          className="product-form__input"
          value={values.length}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};

export default FurnitureDimensions;

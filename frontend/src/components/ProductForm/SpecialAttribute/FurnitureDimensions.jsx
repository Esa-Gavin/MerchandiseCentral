import React from "react";
import "./FurnitureDimensions.scss";

const FurnitureDimensions = ({ value, onChange }) => {
  const handleChange = (field) => (event) => {
    onChange({
      ...value,
      [field]: event.target.value,
    });
  };

  return (
    <div className="furniture-dimensions">
      <div className="input-group">
        <label htmlFor="height">Height (CM)</label>
        <input
          type="number"
          id="height"
          name="height"
          className="product-form__input"
          value={value.height}
          onChange={handleChange('height')}
          min="0"
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
          value={value.width}
          onChange={handleChange('width')}
          min="0"
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
          value={value.length}
          onChange={handleChange('length')}
          min="0"
          required
        />
      </div>
    </div>
  );
};

export default FurnitureDimensions;

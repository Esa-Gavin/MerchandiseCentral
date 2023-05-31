import React from "react";
import "./SKU.scss";

const SKU = ({ value, onChange }) => {
    return (
        <div className="input-group">
            <label htmlFor="sku">SKU</label>
            <input
                type="text"
                id="sku"
                name="sku"
                className="product-form__input"
                value={value}
                onChange={onChange}
                required
            />
      </div>
  )
};

export default SKU;

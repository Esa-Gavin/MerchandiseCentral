import React from "react";
import "./SKU.scss";

const SKU = ({ register }) => {
    return (
        <div className="input-group">
            <label htmlFor="sku">SKU</label>
            <input
                type="text"
                id="sku"
                name="sku"
                className="product-form__input"
                {...register('sku')}
                required
            />
      </div>
  )
};

export default SKU;

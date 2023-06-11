import React, { useEffect } from "react";
import "./FurnitureDimensions.scss";

const FurnitureDimensions = ({ register, setValue, watch }) => {
  const height = watch("specialAttributeHeight");
  const width = watch("specialAttributeWidth");
  const length = watch("specialAttributeLength");

  useEffect(() => {
    register("specialAttributeHeight");
    register("specialAttributeWidth");
    register("specialAttributeLength");
  }, [register]);

  useEffect(() => {
    if (height === undefined) {
      setValue("specialAttributeHeight", "");
    }
    if (width === undefined) {
      setValue("specialAttributeWidth", "");
    }
    if (length === undefined) {
      setValue("specialAttributeLength", "");
    }
  }, [height, width, length, setValue]);

  return (
    <div className="furniture-dimensions">
      <div className="input-group">
        <label htmlFor="height">Height (CM)</label>
        <input
          type="number"
          id="height"
          name="specialAttributeHeight"
          className="product-form__input"
          {...register("specialAttributeHeight")}
          onChange={(e) => setValue("specialAttributeHeight", e.target.value)}
          min="0"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="width">Width (CM)</label>
        <input
          type="number"
          id="width"
          name="specialAttributeWidth"
          className="product-form__input"
          {...register("specialAttributeWidth")}
          onChange={(e) => setValue("specialAttributeWidth", e.target.value)}
          min="0"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="length">Length (CM)</label>
        <input
          type="number"
          id="length"
          name="specialAttributeLength"
          className="product-form__input"
          {...register("specialAttributeLength")}
          onChange={(e) => setValue("specialAttributeLength", e.target.value)}
          min="0"
          required
        />
      </div>
    </div>
  );
};

export default FurnitureDimensions;

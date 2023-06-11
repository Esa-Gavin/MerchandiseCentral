import React, { useEffect } from "react";
import "./DVDSize.scss";

const DVDSize = ({ register, setValue, watch }) => {
  const size = watch("specialAttributeSize");

  useEffect(() => {
    register("specialAttributeSize");
  }, [register]);

  useEffect(() => {
    if (size === undefined) {
      setValue("specialAttributeSize", "");
    }
  }, [size, setValue]);

  return (
    <div className="input-group">
      <label htmlFor="size">Size (MB)</label>
      <input
        type="number"
        id="size"
        name="specialAttributeSize"
        className="product-form__input"
        {...register("specialAttributeSize")}
        onChange={(e) => setValue("specialAttributeSize", e.target.value)}
        required
      />
    </div>
  );
};

export default DVDSize;

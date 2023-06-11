import React, { useEffect } from "react";
import "./BookWeight.scss";

const BookWeight = ({ register, setValue, watch }) => {
  const weight = watch("specialAttributeWeight");

  useEffect(() => {
    register("specialAttributeWeight");
  }, [register]);

  useEffect(() => {
    if (weight === undefined) {
      setValue("specialAttributeWeight", "");
    }
  }, [weight, setValue]);

  return (
    <div className="input-group">
      <label htmlFor="weight">Weight (KG)</label>
      <input
        type="number"
        id="weight"
        name="specialAttributeWeight"
        className="product-form__input"
        {...register("specialAttributeWeight")}
        onChange={(e) => setValue("specialAttributeWeight", e.target.value)}
        required
      />
    </div>
  );
};

export default BookWeight;

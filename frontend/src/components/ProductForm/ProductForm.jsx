import React from "react";
import { useForm } from "react-hook-form";
import Name from "./fields/Name";
import Price from "./fields/Price";
import SKU from "./fields/SKU";
import TypeSwitcher from "./fields/TypeSwitcher";
import DVDSize from "./SpecialAttribute/DVDSize";
import BookWeight from "./SpecialAttribute/BookWeight";
import FurnitureDimensions from "./SpecialAttribute/FurnitureDimensions";
import "./ProductForm.scss";

const ProductForm = ({ onSubmit }) => {
  const { register, handleSubmit, watch, setValue } = useForm();

  const type = watch("type");

  return (
    <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
      <SKU register={register} />
      <Name register={register} />
      <Price register={register} />
      <TypeSwitcher register={register} />
      {type === "DVD" && (
        <DVDSize register={register} watch={watch} setValue={setValue} />
      )}
      {type === "Book" && (
        <BookWeight register={register} watch={watch} setValue={setValue} />
      )}
      {type === "Furniture" && (
        <FurnitureDimensions
          register={register}
          watch={watch}
          setValue={setValue}
        />
      )}
    </form>
  );
};

export default ProductForm;

import React, { useState } from "react";
import Name from "./fields/Name";
import Price from "./fields/Price";
import SKU from "./fields/SKU";
import TypeSwitcher from "./fields/TypeSwitcher";
import DVDSize from "./SpecialAttribute/DVDSize";
import BookWeight from "./SpecialAttribute/BookWeight";
import FurnitureDimensions from "./SpecialAttribute/FurnitureDimensions";
import "./ProductForm.scss";

const ProductForm = () => {
  const [type, setType] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [sku, setSku] = useState();
  const [specialAttribute, setSpecialAttribute] = useState("");

  const handleTypeChange = (selectedType) => {
    setType(selectedType);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSkuChange = (event) => {
    setSku(event.target.value);
  };

  const handleSpecialAttributeChange = (event) => {
    setSpecialAttribute(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <SKU value={sku} onChange={handleSkuChange} />
      <Name value={name} onChange={handleNameChange} />
      <Price value={price} onChange={handlePriceChange} />
      <TypeSwitcher onTypeChange={handleTypeChange} />
      {type === "DVD" && (
        <DVDSize
          value={specialAttribute}
          onChange={handleSpecialAttributeChange}
        />
      )}
      {type === "Book" && (
        <BookWeight
          value={specialAttribute}
          onChange={handleSpecialAttributeChange}
        />
      )}
      {type === "Furniture" && (
        <FurnitureDimensions
          value={specialAttribute}
          onChange={handleSpecialAttributeChange}
        />
      )}
      <button type="submit" className="product-form__submit-btn">
        Add
      </button>
    </form>
  );
};

export default ProductForm;

import React from "react";
import Name from "./fields/Name";
import Price from "./fields/Price";
import SKU from "./fields/SKU";
import TypeSwitcher from "./fields/TypeSwitcher";
import DVDSize from "./SpecialAttribute/DVDSize";
import BookWeight from "./SpecialAttribute/BookWeight";
import FurnitureDimensions from "./SpecialAttribute/FurnitureDimensions";
import "./ProductForm.scss";

const ProductForm = ({ formData, setFormData, onSubmit }) => {
  const handleTypeChange = (selectedType) => {
    let newSpecialAttribute = {};

    switch (selectedType) {
      case "DVD":
        newSpecialAttribute = { size: 0 };
        break;
      case "Book":
        newSpecialAttribute = { weight: 0 };
        break;
      case "Furniture":
        newSpecialAttribute = { height: 0, width: 0, length: 0 };
        break;
      default:
        newSpecialAttribute = {};
    }
    setFormData({
      ...formData,
      type: selectedType,
      specialAttribute: newSpecialAttribute,
    });
  };

  const handleNameChange = (event) => {
    setFormData({ ...formData, name: event.target.value });
  };

  const handlePriceChange = (event) => {
    setFormData({ ...formData, price: event.target.value });
  };

  const handleSkuChange = (event) => {
    setFormData({ ...formData, sku: event.target.value });
  };

  const handleSpecialAttributeChange = (newValue) => {
    setFormData((prevState) => ({
      ...prevState,
      specialAttribute: { ...prevState.specialAttribute, ...newValue },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData); // <-- Call onSubmit with formData as argument
  };

  return (
    <form
      className="product-form"
      id="product-form"
      onSubmit={handleSubmit} // <-- Handle form submission with handleSubmit
    >
      <SKU value={formData.sku} onChange={handleSkuChange} />
      <Name value={formData.name} onChange={handleNameChange} />
      <Price value={formData.price} onChange={handlePriceChange} />
      <TypeSwitcher value={formData.type} onTypeChange={handleTypeChange} />
      {formData.type === "DVD" && (
        <DVDSize
          value={formData.specialAttribute.size}
          onChange={(value) => handleSpecialAttributeChange({ size: value })}
        />
      )}
      {formData.type === "Book" && (
        <BookWeight
          value={formData.specialAttribute.weight}
          onChange={(value) => handleSpecialAttributeChange({ weight: value })}
        />
      )}
      {formData.type === "Furniture" && (
        <FurnitureDimensions
          value={formData.specialAttribute}
          onChange={handleSpecialAttributeChange}
        />
      )}
    </form>
  );
};

export default ProductForm;

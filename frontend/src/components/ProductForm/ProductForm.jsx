import React, { useState } from "react";
import Name from "./fields/Name";
import Price from "./fields/Price";
import SKU from "./fields/SKU";
import TypeSwitcher from "./fields/TypeSwitcher";
import DVDSize from "./SpecialAttribute/DVDSize";
import BookWeight from "./SpecialAttribute/BookWeight";
import FurnitureDimensions from "./SpecialAttribute/FurnitureDimensions";
import "./ProductForm.scss";

const ProductForm = ({ formData, setFormData, loading }) => {
  const [attributeDescription, setAttributeDescription] = useState("");

  const handleTypeChange = (selectedType) => {
    let newSpecialAttribute = {};
    switch (selectedType) {
      case "DVD":
        newSpecialAttribute = { size: "" };
        setAttributeDescription("Please, provide size");
        break;
      case "Book":
        newSpecialAttribute = { weight: "" };
        setAttributeDescription("Please, provide weight");
        break;
      case "Furniture":
        newSpecialAttribute = { height: "", width: "", length: "" };
        setAttributeDescription("Please, provide dimensions");
        break;
      default:
        newSpecialAttribute = {};
        setAttributeDescription(""); // Clear description
    }

    setFormData((prevData) => ({
      ...prevData,
      type: selectedType,
      specialAttribute: newSpecialAttribute,
    }));
  };

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSpecialAttributeChange = (newValue) => {
    setFormData((prevState) => ({
      ...prevState,
      specialAttribute: { ...prevState.specialAttribute, ...newValue },
    }));
  };

  return (
    <form className="product-form" id="product_form">
      <SKU
        value={formData.sku}
        onChange={(e) => handleFieldChange("sku", e.target.value)}
        disabled={loading}
      />
      <Name
        value={formData.name}
        onChange={(e) => handleFieldChange("name", e.target.value)}
        disabled={loading}
      />
      <Price
        value={formData.price}
        onChange={(e) => handleFieldChange("price", e.target.value)}
        disabled={loading}
      />
      <TypeSwitcher
        value={formData.type}
        onTypeChange={handleTypeChange}
        disabled={loading}
      />
      {formData.type === "DVD" && (
        <DVDSize
          value={formData.specialAttribute.size}
          onChange={(value) => handleSpecialAttributeChange({ size: value })}
          disabled={loading}
        />
      )}
      {formData.type === "Book" && (
        <BookWeight
          value={formData.specialAttribute.weight}
          onChange={(value) => handleSpecialAttributeChange({ weight: value })}
          disabled={loading}
        />
      )}
      {formData.type === "Furniture" && (
        <FurnitureDimensions
          value={formData.specialAttribute}
          onChange={handleSpecialAttributeChange}
          disabled={loading}
        />
      )}
      <p>{`* ${attributeDescription}`}</p>
    </form>
  );
};

export default ProductForm;

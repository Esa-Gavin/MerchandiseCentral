import React, { useEffect, useState } from "react";
import Name from "./fields/Name";
import Price from "./fields/Price";
import SKU from "./fields/SKU";
import TypeSwitcher from "./fields/TypeSwitcher";
import DVDSize from "./SpecialAttribute/DVDSize";
import BookWeight from "./SpecialAttribute/BookWeight";
import FurnitureDimensions from "./SpecialAttribute/FurnitureDimensions";
import "./ProductForm.scss";

const ProductForm = ({ formData, setFormData, onSubmit, loading }) => {
  const [formDirty, setFormDirty] = useState(false);

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

    setFormData((prevData) => ({
      ...prevData,
      type: selectedType,
      specialAttribute: newSpecialAttribute,
    }));

    setFormDirty(true);
  };

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    setFormDirty(true);
  };

  const handleSpecialAttributeChange = (newValue) => {
    setFormData((prevState) => ({
      ...prevState,
      specialAttribute: { ...prevState.specialAttribute, ...newValue },
    }));

    setFormDirty(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formDirty) {
      onSubmit(formData);
      setFormDirty(false);
    }
  };

  useEffect(() => {
    if (!formDirty) return;
    const timeoutId = setTimeout(() => onSubmit(formData), 5000);
    return () => clearTimeout(timeoutId);
  }, [formDirty, formData, onSubmit]);

  return (
    <form className="product-form" id="product-form" onSubmit={handleSubmit}>
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
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default ProductForm;

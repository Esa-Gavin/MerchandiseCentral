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

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    let productData = {
      sku: sku,
      name: name,
      price: price,
      productType: type,
    };

    if (type === "DVD") {
      productData.size = specialAttribute.size;
    } else if (type === "Book") {
      productData.weight = specialAttribute.weight;
    } else if (type === "Furniture") {
      productData.dimensions = specialAttribute.dimensions;
    }

    try {
      const response = await fetch("/backend/api/products/post.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      alert("Product created successfully!");
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <SKU value={sku} onChange={handleSkuChange} />
      <Name value={name} onChange={handleNameChange} />
      <Price value={price} onChange={handlePriceChange} />
      <TypeSwitcher onTypeChange={handleTypeChange} />
      {type === "DVD" && (
        <DVDSize
          value={specialAttribute.size}
          onChange={(value) => handleSpecialAttributeChange({ size: value })}
        />
      )}
      {type === "Book" && (
        <BookWeight
          value={specialAttribute.weight}
          onChange={(value) => handleSpecialAttributeChange({ weight: value })}
        />
      )}
      {type === "Furniture" && (
        <FurnitureDimensions
          value={specialAttribute.dimensions}
          onChange={(value) =>
            handleSpecialAttributeChange({ dimensions: value })
          }
        />
      )}
      <button type="submit" className="product-form__submit-btn">
        Add
      </button>
    </form>
  );
};

export default ProductForm;

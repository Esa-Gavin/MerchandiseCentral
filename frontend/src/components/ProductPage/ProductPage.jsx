import React, { useState, useEffect } from "react";
import "./ProductPage.scss";
import ProductForm from "../ProductForm/ProductForm";

const ProductPage = ({ setHandleSave, setReload }) => {
  // 👈 Here's the new prop
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    sku: "",
    type: "",
    specialAttribute: {
      height: 0,
      width: 0,
      length: 0,
    },
  });

  const handleSubmit = async () => {
    console.log(formData);
    let productData = {
      sku: formData.sku,
      name: formData.name,
      price: formData.price,
      productType: formData.type,
    };

    if (formData.type === "DVD") {
      productData.size = formData.specialAttribute.size;
    } else if (formData.type === "Book") {
      productData.weight = formData.specialAttribute.weight;
    } else if (formData.type === "Furniture") {
      productData.dimensions = formData.specialAttribute;
    }

    try {
      const response = await fetch(
        "http://myapp.local/backend/api/products/post.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      alert("Product created successfully!");
      setFormData({
        name: "",
        price: "",
        sku: "",
        type: "",
        specialAttribute: {
          height: 0,
          width: 0,
          length: 0,
        },
      });

      setReload((prev) => !prev); // 👈 Toggle the reload flag here
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const handleSave = () => {
    handleSubmit();
  };

  // Make sure the handleSave is updated whenever ProductPage is rendered
  useEffect(() => {
    setHandleSave(() => handleSave);
  }, []);

  return (
    <>
      <ProductForm
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
};

export default ProductPage;

import React, { useState, useEffect } from "react";
import "./ProductPage.scss";
import ProductForm from "../ProductForm/ProductForm";
import { useNavigate } from "react-router-dom";
useNavigate
const ProductPage = ({ setHandleSave, setReload, setRefreshProducts }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    sku: "",
    type: "",
    specialAttribute: {},
  });

  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [saveTriggered, setSaveTriggered] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (isUpdating) return;
    setLoading(true);

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

      setLoading(false);

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
        specialAttribute: {},
      });

      setRefreshProducts((prev) => prev + 1);

      navigate("/"); // Navigate back to the product list

    } catch (error) {
      setLoading(false);
      alert(`Error: ${error}`);
    }
  };

  useEffect(() => {
    if (!isUpdating && saveTriggered) {
      handleSubmit();
      setSaveTriggered(false);
    }
  }, [isUpdating]);

  const handleSave = () => {
    if (!isUpdating) {
      handleSubmit();
    } else {
      setSaveTriggered(true);
    }
  };

  useEffect(() => {
    setHandleSave(() => handleSave);
  }, []);

  return (
    <ProductForm
      onSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      setIsUpdating={setIsUpdating}
      loading={loading}
    />
  );
};

export default ProductPage;

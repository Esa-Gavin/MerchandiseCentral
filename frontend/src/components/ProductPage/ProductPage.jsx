import React from "react";
import "./ProductPage.scss";
import ProductForm from "../ProductForm/ProductForm";

const ProductPage = ({ formData, setFormData, loading, setIsUpdating }) => {
  return (
    <ProductForm
      loading={loading}
      setIsUpdating={setIsUpdating}
      formData={formData}
      setFormData={setFormData}
    />
  );
};

export default ProductPage;

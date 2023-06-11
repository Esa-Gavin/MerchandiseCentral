import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../AppContext";
import ProductForm from "../ProductForm/ProductForm";
import "./ProductPage.scss";

const ProductPage = () => {
  const { setHandleSave, setReload } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const defaultFormValues = {
    name: "",
    price: "",
    sku: "",
    type: "",
    specialAttributeSize: "",
    specialAttributeWeight: "",
    specialAttributeHeight: "",
    specialAttributeWidth: "",
    specialAttributeLength: "",
  };

  const { register, handleSubmit, formState, setValue, reset, watch } = useForm(
    {
      defaultValues: defaultFormValues,
    }
  );

  useEffect(() => {
    if (formState.isDirty) {
      setHandleSave(() => handleSubmit(onSubmit));
    }
  }, [formState, handleSubmit, setHandleSave]);

  const onSubmit = async (formData) => {
    setLoading(true);

    let productData = {
      sku: formData.sku,
      name: formData.name,
      price: formData.price,
      productType: formData.type,
    };

    if (formData.type === "DVD") {
      productData.size = formData.specialAttributeSize;
    } else if (formData.type === "Book") {
      productData.weight = formData.specialAttributeWeight;
    } else if (formData.type === "Furniture") {
      productData.dimensions = {
        height: formData.specialAttributeHeight,
        width: formData.specialAttributeWidth,
        length: formData.specialAttributeLength,
      };
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
      reset(defaultFormValues);
      setReload((prev) => !prev);
    } catch (error) {
      setLoading(false);
      alert(`Error: ${error}`);
    }
  };

  return (
    <ProductForm
      register={register}
      watch={watch}
      setValue={setValue}
      loading={loading}
    />
  );
};

export default ProductPage;

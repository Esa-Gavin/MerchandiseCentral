import React, { useEffect, useState } from "react";
import "./ProductList.scss";
import ProductCard from "./ProductCard/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("/backend/api/products/get.php");
    const data = await response.json();
    setProducts(data);
  };

  const handleCheck = (event, sku) => {
    if (event.target.checked) {
      setSelectedProducts([...selectedProducts, sku]);
    } else {
      setSelectedProducts(
        selectedProducts.filter((selectedSku) => selectedSku !== sku)
      );
    }
  };

  const handleDelete = async () => {
    const response = await fetch("/backend/api/products/delete.php", {
      method: "POST",
      body: JSON.stringify(selectedProducts),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setProducts(
        products.filter((product) => !selectedProducts.includes(product.sku))
      );
    }
  };

  return (
    <div className="product-list">
      <div>
        <h2>Product List</h2>
        <button id="delete-product-btn" onClick={handleDelete}>
          Mass Delete
        </button>
      </div>
      <div className="product-cards">
        {products.map((product) => {
          <ProductCard
            key={product.sku}
            product={product}
            onCheck={handleCheck}
            isChecked={selectedProducts.includes(product.sku)}
          />;
        })}
      </div>
    </div>
  );
};

export default ProductList;

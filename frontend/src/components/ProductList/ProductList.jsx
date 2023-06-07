import React, { useEffect, useState } from "react";
import "./ProductList.scss";
import ProductCard from "./ProductCard/ProductCard";

const ProductList = ({ products, handleCheck, selectedProducts }) => {
  return (
    <div className="product-list">
      <div className="product-cards">
        {products.map((product) => (
          <ProductCard
            key={product.sku}
            product={product}
            onCheck={handleCheck}
            isChecked={selectedProducts.includes(product.sku)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

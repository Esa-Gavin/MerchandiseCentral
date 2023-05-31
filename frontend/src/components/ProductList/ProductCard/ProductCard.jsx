import React from "react";
import "./ProductCard.scss";

const ProductCard = ({ product, isChecked, onCheck }) => {
  const { sku, name, price, attribute } = product;

  const handleCheck = () => {
    onCheck(sku);
  };

  return (
    <div className="product-card">
      <input
        type="checkbox"
        className="product-checkbox"
        checked={isChecked}
        onChange={handleCheck}
      />
      <div className="product-info">
        <p className="sku">SKU: {sku}</p>
        <p className="name">SKU: {name}</p>
        <p className="price">SKU: {price}</p>
              <p className="attribute">
                  Attribute: {attribute.name} - {attribute.value}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;

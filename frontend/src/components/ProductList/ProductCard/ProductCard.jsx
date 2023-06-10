import React from "react";
import "./ProductCard.scss";

const ProductCard = ({ product, isChecked, onCheck }) => {
  const { sku, name, price, type } = product;

  let attributeLabel = "";
  let attributeValue = "";

  if (type === "DVD") {
    attributeLabel = "Size";
    attributeValue = product.size;
  } else if (type === "Book") {
    attributeLabel = "Weight";
    attributeValue = `${product.weight} KG`;
  } else if (type === "Furniture") {
    attributeLabel = "Dimensions";
    attributeValue = `${product.height}*${product.width}*${product.length}`;
  }

  const handleCheck = (event) => {
    onCheck(event, sku);
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
        <p className="sku">{sku}</p>
        <p className="name">{name}</p>
        <p className="price">{price} $</p>
        <p className="attribute">
          {attributeLabel} : {attributeValue}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;

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
        <p className="sku">{sku}</p>
        <p className="name">{name}</p>
        <p className="price">{price} $</p>
              <p className="attribute">
                  Attribute: {attribute && attribute.name} - {attribute && attribute.value}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;

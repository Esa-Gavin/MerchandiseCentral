import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = ({ handleDelete, selectedProducts }) => {
  const location = useLocation();
  const navigate = useNavigate();

  let title, buttons;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (location.pathname === "/add-product") {
      document
        .getElementById("product-form")
        .dispatchEvent(new Event("submit"));
    }
  };

  const handleMassDelete = () => {
    if (selectedProducts.length === 0) {
      alert("Please select products to delete.");
    } else {
      handleDelete();
    }
  };

  if (location.pathname === "/add-product") {
    title = "Product Add";
    buttons = [
      { label: "Save", id: "saveBtn", onClick: handleSubmit },
      { label: "Cancel", id: "cancelBtn", onClick: () => navigate("/") },
    ];
  } else {
    title = "Product List";
    buttons = [
      { label: "Add", id: "addBtn", onClick: () => navigate("/add-product") },
      {
        label: "Mass Delete",
        id: "massDeleteBtn",
        onClick: handleMassDelete,
      },
    ];
  }

  return (
    <header className="header">
      <h1>{title}</h1>
      <div className="header-buttons">
        {buttons.map((button, index) => (
          <button key={index} onClick={button.onClick} id={button.id}>
            {button.label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;

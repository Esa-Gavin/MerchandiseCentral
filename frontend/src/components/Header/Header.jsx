import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = ({ handleDelete, selectedProducts, handleSave }) => {
  const location = useLocation();
  const navigate = useNavigate();

  let title, buttons;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (location.pathname === "/add-product") {
      handleSave();
    }
  };

  const handleMassDelete = () => {
    if (selectedProducts.length === 0) {
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
      { label: "ADD", id: "addBtn", onClick: () => navigate("/add-product") },
      {
        label: "MASS DELETE",
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

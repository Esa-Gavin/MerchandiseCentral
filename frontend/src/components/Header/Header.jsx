import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import "./Header.scss";

const Header = ({ handleDelete }) => {
  const { handleSave } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  let title, buttons;

  const handleMassDelete = () => {
    if (typeof handleDelete === "function") {
      handleDelete();
    } else {
      alert("Please select products to delete.");
    }
  };

  if (location.pathname === "/add-product") {
    title = "Product Add";
    buttons = [
      { label: "Save", id: "saveBtn", onClick: handleSave },
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

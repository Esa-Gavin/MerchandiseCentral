import React from "react";
import "./Header.scss";

const Header = ({ title, buttons }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <div className="header-buttons">
        {buttons.map((button, index) => {
          <button key={index} onClick={button.onClick}>
            {button.label}
          </button>;
        })}
      </div>
    </header>
  );
};

export default Header;

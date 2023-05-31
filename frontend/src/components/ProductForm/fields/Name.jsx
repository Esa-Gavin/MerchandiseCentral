import React from "react";
import './Name.scss';

const Name = ({ value, onChange }) => {
    return (
        <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
                type="text"
                id="name"
                name="name"
                className="product-form__input"
                value={value}
                onChange={onChange}
                required
            />
        </div>
    )
}

export default Name;
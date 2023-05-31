import React from "react";
import './BookWeight.scss';

const BookWeight = ({ value, onChange }) => {
    return (
        <div className="input-group">
            <label htmlFor="weight">Weight (KG)</label>
            <input
                type="number"
                id="weight"
                name="weight"
                className="product-form__input"
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );
};

export default BookWeight;
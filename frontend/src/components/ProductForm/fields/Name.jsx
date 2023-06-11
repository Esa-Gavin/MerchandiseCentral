import React from "react";
import './Name.scss';

const Name = ({ register }) => {
    return (
        <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
                type="text"
                id="name"
                name="name"
                className="product-form__input"
                {...register('name')}
                required
            />
        </div>
    )
}

export default Name;
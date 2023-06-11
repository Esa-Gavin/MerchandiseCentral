import React from "react";

// Initial state
const initialState = {
  handleSave: null,
};

// Create context
export const AppContext = React.createContext(initialState);

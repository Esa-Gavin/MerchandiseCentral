import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "./App.css";

// Importing the AppContext
import { AppContext } from "./AppContext";

// 👇 importing my components
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import ProductPage from "./components/ProductPage/ProductPage";
import Footer from "./components/Footer/Footer";

function MainContent() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const { handleSave, setHandleSave } = useContext(AppContext);

  // Implement your fetchProducts function here
  // ...

  const handleCheck = (event, sku) => {
    if (event.target.checked) {
      setSelectedProducts([...selectedProducts, sku]);
    } else {
      setSelectedProducts(
        selectedProducts.filter((selectedSku) => selectedSku !== sku)
      );
    }
  };

  const handleDelete = async () => {
    const response = await fetch(
      "http://myapp.local/backend/api/products/delete.php",
      {
        method: "POST",
        body: JSON.stringify(selectedProducts),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      setProducts(
        products.filter((product) => !selectedProducts.includes(product.sku))
      );
      setSelectedProducts([]);
      setReload((prev) => !prev); // toggle reload state to fetch updated products
    }
  };

  return (
    <>
      <div id="content">
        <Header handleDelete={handleDelete} handleSave={handleSave} />
        <Routes>
          <Route
            path="/add-product"
            element={
              <ProductPage
                setHandleSave={setHandleSave}
                setReload={setReload}
              />
            }
          />
          <Route
            path="/"
            element={
              <ProductList
                products={products}
                selectedProducts={selectedProducts}
                handleCheck={handleCheck}
              />
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

function App() {
  const [handleSave, setHandleSave] = useState(null);

  return (
    <Router>
      <AppContext.Provider value={{ handleSave, setHandleSave }}>
        <MainContent />
      </AppContext.Provider>
    </Router>
  );
}

export default App;

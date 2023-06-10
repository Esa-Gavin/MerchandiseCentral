import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";

// 👇 importing my components
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import ProductPage from "./components/ProductPage/ProductPage";
import Footer from "./components/Footer/Footer";
import { useState, useEffect } from "react";

function MainContent() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [handleSave, setHandleSave] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [reload]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://myapp.local/backend/api/products/get.php"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log("Fetch error: ", error);
    }
  };

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
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;

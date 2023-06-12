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
  const [refreshProducts, setRefreshProducts] = useState(0);

  const navigate = useNavigate();

  // 👇 when you call add-product, the react-router-dom library
  // looks for a Route with a matching path in the apps routing configuration
  // which is, <Route path="/add-product" element={<ProductForm />} />
  const handleAdd = () => {
    navigate("/add-product");
  };

  useEffect(() => {
    const abortController = new AbortController();

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://myapp.local/backend/api/products/get.php",
          { signal: abortController.signal }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.log("Fetch error: ", error);
        }
      }
    };

    fetchProducts();

    // cleanup function
    return () => {
      abortController.abort();
    };
  }, [refreshProducts]);

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
    }
  };

  return (
    <>
      <div id="content">
        <Header
          handleDelete={handleDelete}
          handleSave={handleSave}
          selectedProducts={selectedProducts}
        />
        <Routes>
          <Route
            path="/add-product"
            element={
              <ProductPage
                setHandleSave={setHandleSave}
                setRefreshProducts={setRefreshProducts}
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

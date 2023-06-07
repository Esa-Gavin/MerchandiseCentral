import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import './App.css';

// 👇 importing my components
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import ProductForm from "./components/ProductForm/ProductForm";
import Footer from "./components/Footer/Footer";
import { useState, useEffect } from "react";

function MainContent() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const navigate = useNavigate();

  // 👇 when you call add-product, the react-router-dom library
  // looks for a Route with a matching path in the apps routing configuration
  // which is, <Route path="/add-product" element={<ProductForm />} />
  const handleAdd = () => {
    navigate("/add-product");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
    const response = await fetch("/backend/api/products/delete.php", {
      method: "POST",
      body: JSON.stringify(selectedProducts),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setProducts(
        products.filter((product) => !selectedProducts.includes(product.sku))
      );
    }
  };

  return (
    <>
      <Header
        title="Product List"
        buttons={[
          { label: "Add", onClick: handleAdd },
          { label: "Mass Delete", onClick: handleDelete },
        ]}
      />
      <div id="content">
        <Routes>
          <Route path="/add-product" element={<ProductForm />} />
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
  )
}

export default App;

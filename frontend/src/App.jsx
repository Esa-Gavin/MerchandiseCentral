import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";

// 👇 importing my components //
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import ProductPage from "./components/ProductPage/ProductPage";
import Footer from "./components/Footer/Footer";
import { useState, useEffect } from "react";

function MainContent() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [refreshProducts, setRefreshProducts] = useState(0);
  const [saveTriggered, setSaveTriggered] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    sku: "",
    type: "",
    specialAttribute: {},
  });

  const navigate = useNavigate();

  // 👇 when you call add-product, the react-router-dom library
  // looks for a Route with a matching path in the apps routing configuration
  // which is, <Route path="/add-product" element={<ProductForm />} />
  const handleAdd = () => {
    navigate("/add-product");
  };

  const handleSubmit = async (isUpdating) => {
    if (isUpdating) return;
    setLoading(true);

    let productData = {
      sku: formData.sku,
      name: formData.name,
      price: formData.price,
      productType: formData.type,
    };

    if (formData.type === "DVD") {
      productData.size = formData.specialAttribute.size;
    } else if (formData.type === "Book") {
      productData.weight = formData.specialAttribute.weight;
    } else if (formData.type === "Furniture") {
      productData.dimensions = formData.specialAttribute;
    }

    try {
      const response = await fetch(
        "/backend/api/products/post.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      setLoading(false);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      alert("Product created successfully!");
      setFormData({
        name: "",
        price: "",
        sku: "",
        type: "",
        specialAttribute: {},
      });

      setRefreshProducts((prev) => prev + 1);

      navigate("/"); // Navigate back to the product list
    } catch (error) {
      setLoading(false);
      alert(`Error: ${error}`);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "/backend/api/products/get.php",
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
      "/backend/api/products/delete.php",
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

  const handleSave = () => {
    if (!isUpdating) {
      handleSubmit(isUpdating);
    } else {
      setSaveTriggered(true);
    }
  };

  useEffect(() => {
    if (!isUpdating && saveTriggered) {
      handleSubmit(isUpdating);
      setSaveTriggered(false);
    }
  }, [isUpdating, saveTriggered, handleSubmit]);

  return (
    <>
      <div id="content">
        <Header
          handleDelete={handleDelete}
          onSubmit={handleSubmit}
          selectedProducts={selectedProducts}
          isUpdating={isUpdating}
          handleSave={handleSave}
        />
        <Routes>
          <Route
            path="/add-product"
            element={
              <ProductPage
                handleSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                loading={loading}
                setLoading={setLoading}
                setIsUpdating={setIsUpdating}
                handleSave={handleSave}
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

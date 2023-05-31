import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// 👇 importing my components
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import ProductForm from "./components/ProductForm/ProductForm";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <Header
        title="Product List"
        buttons={[
          { label: "Add", onClick: () => console.log("Add") },
          { label: "Mass Delete", onClick: () => console.log("Mass Delete") },
        ]}
      />
      <Routes>
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/" element={<ProductList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

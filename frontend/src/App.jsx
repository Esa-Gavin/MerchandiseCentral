import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// 👇 importing my components
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/add-product">
          <ProductForm />
        </Route>
        <Route path="/">
          <ProductList />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

import { Link, Outlet } from "react-router-dom";
import "./App.css";
import Register from "./Component/Register/Register";
import Footer from "./Component/Footer/Footer";
import Nav from './Component/Nav/Nav'
function App() {
  return (
    <div className="App">
      <Nav />
      <Register />
      <Footer />
    </div>
  );
}

export default App;

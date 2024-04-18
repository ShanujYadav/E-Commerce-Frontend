import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./component/Login"
import Signip from "./component/Signup"
import Home from "./component/Home"
import AddProduct from "./component/AddProduct"
import Cart from "./component/Cart"


const App = () => {
  return <>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signip />}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/addToProduct" element={<AddProduct />} />
        <Route path="/showCart" element={<Cart />}></Route>
      </Routes>
    </Router>


  </>
}
export default App
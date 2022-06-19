import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminProduct } from "./components/AdminProduct/AdminProduct";
import { Login } from "./components/Authentication/Login/Login";
import { Registration } from "./components/Authentication/Registration/Registration";
import { Cart } from "./components/Cart/Cart";
import { Home } from './components/Home/Home'

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/registration" element={<Registration/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/admin/product" element={<AdminProduct/>}></Route>
          <Route path="/watches" element={<Home/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}
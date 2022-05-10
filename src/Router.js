import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Authentication/Login/Login";
import { Registration } from "./components/Authentication/Registration/Registration";
import { Home } from './components/Home/Home'

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/registration" element={<Registration/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}
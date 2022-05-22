import { Component } from "react";
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { Search } from '../Search/Search';
import { FaUserAlt, FaShoppingCart } from 'react-icons/fa';
import './Header.scss';

export class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <div className="header-tabs-container">
          <div className="header-tab-container">
            <Link to={'/'}>FEMEI</Link>
          </div>
          <div className="header-tab-container">
            <Link to={'/barbati'}>BARBATI</Link>
          </div>
        </div>
        <div className="logo-container">
          <Link to={'/'}>
            <img src={logo} height="100" alt="Logo" />
          </Link>
        </div>
        <div className="my-account-menu">
          <div className="search-container">
            <Search/>
          </div>
          <div className="user-container">
            <Link to={'/login'}><FaUserAlt size={28}/></Link>
          </div>
          <div className="cart-container">
            <Link to={'/cart'}><FaShoppingCart size={28}/></Link>
          </div>
        </div>
      </div>
    );
  }
}
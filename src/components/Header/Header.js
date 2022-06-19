import { Component } from "react";
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { Search } from '../Search/Search';
import { FaUserAlt, FaShoppingCart } from 'react-icons/fa';
import './Header.scss';

export class Header extends Component {
  onSelectGender = (gender) => {
    localStorage.setItem("gender", gender);
    this.props.rerenderParentCallback();
  }

  render() {
    return (
      <div className="header-container">
        <div className="header-tabs-container">
          <div className="header-tab-container">
            <Link onClick={() => this.onSelectGender(0)} to={'/'}>FEMEI</Link>
          </div>
          <div className="header-tab-container">
            <Link onClick={() => this.onSelectGender(1)} to={'/'}>BARBATI</Link>
          </div>
        </div>
        <div className="logo-container">
          <Link to={'/'}>
            <img src={logo} height="100" alt="Logo" />
          </Link>
        </div>
        <div className="my-account-menu">
          <div className="search-container">
            <Search searchProducts={this.props.searchProducts}/>
          </div>
          <div className="user-container">
            <Link to={'/login'}><FaUserAlt size={28}/></Link>
          </div>
          <div className="cart-container">
            <Link to={'/cart'}><FaShoppingCart size={28}/></Link>
            <span className='badge badge-warning' id='lblCartCount'>{this.props.cartCountItems ? this.props.cartCountItems : ""}</span>
          </div>
        </div>
      </div>
    );
  }
}
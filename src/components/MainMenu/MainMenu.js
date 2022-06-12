import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MainMenu.scss';

export class MainMenu extends Component {
  constructor(props) {
    super(props);
  }

  onSelectCategory = (category) => {
    localStorage.setItem("category", category);
    this.props.rerenderParentCallback();
  }

  render() {
    return (
      <div className='category-menu-container'>
        <div className='category-menu-item-container'>
          <Link onClick={() => this.onSelectCategory(0)} to={'/'}>Ceasuri</Link>
        </div>
        <div className='category-menu-item-container'>
          <Link onClick={() => this.onSelectCategory(1)} to={'/'}>Genti</Link>
        </div>
        <div className='category-menu-item-container'>
          <Link onClick={() => this.onSelectCategory(2)} to={'/'}>Blugi</Link>
        </div>
        <div className='category-menu-item-container'>
          <Link onClick={() => this.onSelectCategory(3)} to={'/'}>Camasi</Link>
        </div>
      </div>
    )
  }
}

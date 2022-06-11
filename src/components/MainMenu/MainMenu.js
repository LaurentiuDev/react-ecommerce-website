import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MainMenu.scss';

export class MainMenu extends Component {
  render() {
    return (
      <div className='category-menu-container'>
        <div className='category-menu-item-container'>
          <Link to={'/watches'}>Ceasuri</Link>
        </div>
        <div className='category-menu-item-container'>
          <Link to={'/bags'}>Genti</Link>
        </div>
        <div className='category-menu-item-container'>
          <Link to={'/blugi'}>Blugi</Link>
        </div>
        <div className='category-menu-item-container'>
          <Link to={'/camasi'}>Camasi</Link>
        </div>
      </div>
    )
  }
}

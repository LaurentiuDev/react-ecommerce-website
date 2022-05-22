import React, { Component } from 'react';
import './Product.scss';
import ceas from '../../images/ceas.jpg';

export class Product extends Component {
  constructor(props) {
    super(props);
  }

  getDecimalPart = (number) => {
    if (Number.isInteger(number)) {
      return "";
    }
  
    const decimalString = number.toString().split('.')[1];
    return Number(decimalString);
  }

  render() {
    const productPriceInteger = parseInt(this.props.product.price);
    return (
      <div className='product-container'>
        <div className='product-image-container'>
          <img src={this.props.product.image} alt='ceas'/>
        </div>
        <div className='wishlist-icon-container'>

        </div>
        <div className='product-brand-container'>
          <h2>{this.props.product.brand}</h2>
        </div>
        <div className='product-name-containter'>
          <p>{this.props.product.name}</p>
        </div>
        <div className='price-container'>
          <h4>
            {productPriceInteger}
            <sup className='price-decimals'>{this.getDecimalPart(this.props.product.price)}</sup> Lei
          </h4>
        </div>
      </div>
    )
  }
}

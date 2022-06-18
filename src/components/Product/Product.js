import React, { Component } from 'react';
import './Product.scss';
import ceas from '../../images/ceas.jpg';
import { Button } from 'reactstrap';

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

  onAddToCart = (product) => {
    product.isInCart = true;
    fetch(`https://ionic-angular-course-6b3ff.firebaseio.com/products/${product.id}.json`, {
      method: "PATCH",
      body: JSON.stringify(product)
    }).then((data) => {
      console.log(data);
      this.props.rerenderParentCallback();
    });
  }

  render() {
    const product = this.props.product;
    const productPriceInteger = parseInt(product.price);
    return (
      <div className='product-container'>
        <div className='product-image-container'>
          <img src={product.image} alt='ceas'/>
        </div>
        <div className='wishlist-icon-container'>

        </div>
        <div className='product-brand-container'>
          <h2>{product.brand}</h2>
        </div>
        <div className='product-name-containter'>
          <p>{product.name}</p>
        </div>
        <div className='price-container'>
          <h4>
            {productPriceInteger}
            <sup className='price-decimals'>{this.getDecimalPart(product.price)}</sup> Lei
          </h4>
        </div>
        <div className='add-to-cart-button-container'>
          <Button className='add-to-cart-button' color="primary" onClick={() => this.onAddToCart(product)}>Adauga in cos</Button>
        </div>
      </div>
    )
  }
}

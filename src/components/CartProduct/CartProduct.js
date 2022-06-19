import React, { Component } from 'react';
import "./CartProduct.scss";
import { FaTrashAlt } from 'react-icons/fa';

export class CartProduct extends Component {
  getDecimalPart = (number) => {
    if (Number.isInteger(number)) {
      return "";
    }
  
    const decimalString = number.toString().split('.')[1];
    return Number(decimalString);
  }

  onRemoveCartProduct = (product) => {
    product.isInCart = false;
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
      <div className='cart-product-container'>
        <div className='cart-product-image-container'>
          <img src={product.image} alt='ceas'/>
        </div>
        <div className='cart-product-info'>
          <div className='cart-remove-product-container'>
            <button
              className='cart-remove-product-button'
              onClick={() => this.onRemoveCartProduct(product)}
              >
                <FaTrashAlt size={28}></FaTrashAlt>
              </button>
          </div>
          <div className='cart-product-brand-container'>
            <h2>{product.brand}</h2>
          </div>
          
          <div className='cart-product-name-containter'>
            {product.name}
          </div>
          <div className='cart-price-container'>
            <h4>
              {productPriceInteger}
              <sup className='cart-price-decimals'>{this.getDecimalPart(product.price)}</sup> Lei
            </h4>
          </div>
        </div>
      </div>
    )
  }
}

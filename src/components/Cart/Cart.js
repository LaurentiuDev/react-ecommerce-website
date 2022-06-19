import React, { Component } from 'react'
import { Alert, Button } from 'reactstrap';
import { CartProduct } from '../CartProduct/CartProduct';
import { Header } from '../Header/Header'
import { MainMenu } from '../MainMenu/MainMenu';
import "./Cart.scss";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isSentOrder: false
    };
    this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
  }

  componentDidMount() {
    this.getAllProducts();
  }

  getAllProducts = () => {
    fetch(`https://ionic-angular-course-6b3ff.firebaseio.com/products.json`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then((data) => {
      const products = [];
      Object.keys(data).forEach((key) => {
        data[key].id = key;
        if (data[key].isInCart) {
          products.push(data[key]);
        }
      })
      console.log(data);
      console.log(products);

      this.setState({
        products
      });
    });
  }

  rerenderParentCallback() {
    this.getAllProducts()
    this.forceUpdate();
  }

  getDecimalPart = (number) => {
    if (Number.isInteger(number)) {
      return "";
    }
  
    const decimalString = number.toString().split('.')[1];
    return Number(decimalString);
  }

  onSentOrder = () => {
    this.setState({
      isSentOrder: true
    });
  }

  toggleSentOrder = () => {
    this.setState({
      isSentOrder: !this.state.isSentOrder
    });
  }

  render() {
    const { products, isSentOrder } = this.state;
    const cartCountItems = products.filter(product => product.isInCart).length;
    localStorage.setItem("cartCountItems", cartCountItems);
    const contentProducts = products.map((product, index) => <CartProduct key={index} product={product} rerenderParentCallback={this.rerenderParentCallback}/>);
    const totalOrderPrice = products.reduce((partialSum, product) => {
      return partialSum + Number(product.price);
    }, 0);
    return (
      <div className='cart-container'>
        <Alert color="info" isOpen={isSentOrder} toggle={this.toggleSentOrder}>Comanda este pe drum!</Alert>
        <Header cartCountItems={cartCountItems}></Header>
        <MainMenu rerenderParentCallback={this.rerenderParentCallback}/>
        <div className='page-title'>Cosul de cumparaturi</div>
        <div className='cart-items-container row'>
          <div className='products-container col-xs-12 col-md-8'>
            {contentProducts}
          </div>
          <div className='order-summary col-xs-12 col-md-4'>
            <div className='title-order-summary'>
              <h2>Rezumat comanda</h2>
            </div>
            <div className='total-order-price'>
              <div className='total-order-price-title'>Total</div>
              <div className='total-order-price-value'>{parseInt(totalOrderPrice)}<sup className='price-decimals'>{this.getDecimalPart(totalOrderPrice)}</sup> Lei</div>
            </div>
            <div className='sent-order'>
              <Button className='sent-order-button' color="primary" onClick={this.onSentOrder}>Trimite comanda</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

import { Component } from 'react';
import { Header } from '../Header/Header';
import { MainMenu } from '../MainMenu/MainMenu';
import { Product } from '../Product/Product';
import './Home.scss';
import ceas from '../../images/ceas.jpg';
import geanta from '../../images/geanta.jpg';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
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
        products.push(data[key]);
      })
      console.log(data);
      console.log(products);
      this.setState({
        products
      });
    });
  }

  render() {
    const products = this.state.products && this.state.products.map((product, index) =>
      <Product key={index} product={product}/>
    );
    return (
      <div className='home-container'>
        <Header/>
        <MainMenu/>
        <div className='products-container'>
          {products}
        </div>
      </div>
    );
  }
}
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
      products: [],
      searchQuery: ""
    };

    this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
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

  rerenderParentCallback() {
    this.forceUpdate();
  }

  searchProducts = (value) => {
    const { products} = this.state;
    const searchProducts = products
      .filter(product => value && `${product.name}`.toLowerCase().search(value.toLowerCase()) > -1);

    this.setState({
      products: searchProducts,
      searchQuery: value
    })
  }

  render() {
    const gender = localStorage.getItem("gender");
    const category = localStorage.getItem("category");
    const searchQuery = this.state.searchQuery;
    const products = this.state.products && this.state.products
      .filter(product => product.gender === gender && (category === null || product.category === category))
      .map((product, index) =>
      <Product key={index} product={product}/>
    );
    return (
      <div className='home-container'>
        <Header searchProducts={this.searchProducts} rerenderParentCallback={this.rerenderParentCallback}/>
        <MainMenu rerenderParentCallback={this.rerenderParentCallback}/>
        <div className='products-container'>
          {products}
        </div>
      </div>
    );
  }
}
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
    this.setState({
      products: [
        {
          name: "Ceas analog cu coroana texturata",
          image: ceas,
          brand: "Fossil",
          price: 500.99
        },
        {
          name: "Geanta crossbody de piele Primula",
          image: geanta,
          brand: "Furla",
          price: 1429.99
        }
      ]
    })
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
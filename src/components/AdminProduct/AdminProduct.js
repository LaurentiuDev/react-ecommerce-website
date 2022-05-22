import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import './AdminProduct.scss';
import ceas from './../../images/ceas.jpg';
import { AddProductModal } from './AddProductModal/AddProductModal';

export class AdminProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAddProductModal: false
    }
  }
  onOpenAddProductModal = () => {
    this.setState({
      isOpenAddProductModal: true
    })
  }
  render() {
    return (
      <div className='table-container'>
        <div className='main-header'>
          <div className='table-title-container'>
            <h1>Products</h1>
          </div>
          <div className='add-button-container'>
            <Button color='success' onClick={this.onOpenAddProductModal.bind(this)}>Add</Button> 
          </div>
        </div>
        <hr></hr>
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><img className='' src={ceas}/></td>
              <td>Ceas analog cu coroana texturata</td>
              <td>Fossil</td>
              <td>500.99</td>
              <td className='actions-container'>
                <Button color="secondary" className='edit-button'>Edit</Button>
                <Button color="danger" className='delete-button'>Delete</Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <AddProductModal isOpen={this.state.isOpenAddProductModal}/>
      </div>
    )
  }
}

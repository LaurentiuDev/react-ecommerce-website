import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import './AdminProduct.scss';
import ceas from './../../images/ceas.jpg';

export class AdminProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      brand: "",
      price: null,
      image: null,
      isOpenAddProductModal: false,
      backdrop: true
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  onToggleAddProductModal = () => {
    this.setState({
      isOpenAddProductModal: !this.state.isOpenAddProductModal
    });
  }

  handleImageAsFile = (event) => {
    const image = event.target.files[0];
    this.setState({
      image: image
    });
  }

  onSave = () => {
    this.setState({
      isOpenAddProductModal: !this.state.isOpenAddProductModal
    });

    console.log(this.state.name);
  }

  render() {
    const isOpenAddProductModal = this.state.isOpenAddProductModal;
    return (
      <div className='table-container'>
        <div className='main-header'>
          <div className='table-title-container'>
            <h1>Products</h1>
          </div>
          <div className='add-button-container'>
            <Button color='success' onClick={this.onToggleAddProductModal.bind(this)}>Add</Button>
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
        <Modal isOpen={isOpenAddProductModal} toggle={this.onToggleAddProductModal} backdrop={this.state.backdrop}>
          <ModalHeader toggle={this.onToggleAddProductModal}>Add product</ModalHeader>
          <ModalBody>
            <Form inline onSubmit={(event) => event.preventDefault()}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" onChange={this.handleChange}></Input>
              </FormGroup>
              <FormGroup>
                <Label for="brand">Brand</Label>
                <Input type="text" name="brand" onChange={this.handleChange}></Input>
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input type="number" name="price" onChange={this.handleChange}></Input>
              </FormGroup>
              <FormGroup>
                <Label for="image">Image</Label>
                <Input type="file" name="image" onChange={this.handleImageAsFile}></Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.onSave}>Save</Button>
            <Button color='danger' onClick={this.onToggleAddProductModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

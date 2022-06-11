import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import './AdminProduct.scss';
import ceas from './../../images/ceas.jpg';
import { storage } from '../../Firebase/Firebase';

export class AdminProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      brand: "",
      price: null,
      image: null,
      gender: "0",
      category: "0",
      isOpenProductModal: false,
      isOpenProductDeleteModal: false,
      backdrop: true,
      products: []
    };

    this.onToggleProductModal = this.onToggleProductModal.bind(this);
    this.onToggleProductDeleteModal = this.onToggleProductDeleteModal.bind(this);
    this.onSave = this.onSave.bind(this);

    this.adminProductRef = React.createRef();
    this.adminAddProductModalRef = React.createRef();
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

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  onToggleProductModal = (product) => {
    if (product) {
      this.setState({
        isOpenProductModal: !this.state.isOpenProductModal,
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        gender: product.gender,
        category: product.category
      });
    } else {
      this.setState({
        isOpenProductModal: !this.state.isOpenProductModal,
        id: "",
        name: "",
        brand: "",
        price: null,
        image: "",
        gender: "",
        category: ""
      });
    }
  }

  handleImageAsFile = (event) => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.setState({
        image: image
      });
    }
  }

  onSave = () => {
    this.setState({
      isOpenProductModal: !this.state.isOpenProductModal
    });
    const { id, name, brand, price, image, gender, category } = this.state;

    const product = {
      id,
      name,
      brand,
      price,
      image,
      gender,
      category
    };
    if (!product.image.name) {
      this.onUpdate(product);
    } else {
      this.onUploadImage(product);
    }
  }

  onAdd = (product) => {
    fetch(`https://ionic-angular-course-6b3ff.firebaseio.com/products.json`, {
      method: 'POST',
      body: JSON.stringify(product)
    }).then((data) => {
      console.log(data);
      this.getAllProducts();
    })
  }

  onUpdate = (product) => {
    fetch(`https://ionic-angular-course-6b3ff.firebaseio.com/products/${product.id}.json`, {
      method: "PATCH",
      body: JSON.stringify(product)
    }).then((data) => {
      console.log(data);
      this.getAllProducts();
    })
  }

  onUploadImage = (product) => {
    const uploadTask = storage.ref(`images/${product.image.name}`).put(product.image);
    uploadTask.on('state_changed',
    (snapshot) => {
      // progress function ....
    },
    (error) =>{
      // error function ....
      console.log(error);
    },
    () => {
      // complete function
      storage.ref('images').child(product.image.name).getDownloadURL().then(image => {
        console.log(image);
        product.image = image;
        if (product.id) {
          this.onUpdate(product);
        } else {
          this.onAdd(product);
        }
      })
    });
  }

  onDelete = (id) => {
    fetch(`https://ionic-angular-course-6b3ff.firebaseio.com/products/${id}.json`, {
      method: "DELETE",
    }).then((data) => {
      console.log(data);
      this.getAllProducts();
    });

    this.onToggleProductDeleteModal();
  }

  onToggleProductDeleteModal = (product) => {
    this.setState({
      id: product?.id,
      name: product?.name,
      isOpenProductDeleteModal: !this.state.isOpenProductDeleteModal
    })
  }

  render() {
    const { id, name, brand, price, image, gender, category, isOpenProductModal, isOpenProductDeleteModal, products } = this.state;
    const tableProducts = products && products.map((product, id) => {
      return (
        <tr key={id}>
          <td>{id + 1}</td>
          <td><img className='' src={product.image}/></td>
          <td>{product.name}</td>
          <td>{product.brand}</td>
          <td>{product.price}</td>
          <td>{product.gender}</td>
          <td>{product.category}</td>
          <td className='actions-container'>
            <Button
              color="secondary"
              className='edit-button'
              onClick={() => this.onToggleProductModal(product)}
              >
                Edit
              </Button>
            <Button
              color="danger"
              className='delete-button'
              onClick={() => this.onToggleProductDeleteModal(product)}
              >
                Delete
              </Button>
          </td>
        </tr>
      );
    })
    return (
      <div className='table-container' ref={this.adminProductRef}>
        <div className='main-header'>
          <div className='table-title-container'>
            <h1>Products</h1>
          </div>
          <div className='add-button-container'>
            <Button color='success' onClick={this.onToggleProductModal}>Add</Button>
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
              <th>Gender</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableProducts}
          </tbody>
        </Table>
        <Modal
          isOpen={isOpenProductModal}
          toggle={this.onToggleProductModal}
          backdrop={this.state.backdrop}
          ref={this.adminAddProductModalRef}
          >
          <ModalHeader toggle={this.onToggleProductModal}>{ id ? 'Edit' : 'Add' } product</ModalHeader>
          <ModalBody>
            <Form inline onSubmit={(event) => event.preventDefault()}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" value={name} onChange={this.handleChange}></Input>
              </FormGroup>
              <FormGroup>
                <Label for="brand">Brand</Label>
                <Input type="text" name="brand" value={brand} onChange={this.handleChange}></Input>
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input type="number" name="price" value={price} onChange={this.handleChange}></Input>
              </FormGroup>
              <FormGroup>
                <Label for="image">Image</Label>
                <Input type="file" name="image" onChange={this.handleImageAsFile}></Input>
                <img className='' src={image}/>
              </FormGroup>
              <FormGroup>
                <Label for="gender">Gender</Label>
                <Input type="select" name="gender" value={gender} onChange={this.handleChange}>
                  <option value={'0'}>Femei</option>
                  <option value={'1'}>Barbati</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="category">Category</Label>
                <Input type="select" name="category" value={category} onChange={this.handleChange}>
                  <option value={'0'}>Ceasuri</option>
                  <option value={'1'}>Genti</option>
                  <option value={'2'}>Blugi</option>
                  <option value={'3'}>Camasi</option>
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.onSave}>Save</Button>
            <Button color='danger' onClick={this.onToggleProductModal}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={isOpenProductDeleteModal} toggle={this.onToggleProductDeleteModal}>
          <ModalHeader>Delete product</ModalHeader>
          <ModalBody><p>Are you sure you want to delete product: {name}?</p></ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={() => this.onDelete(id)}>Delete</Button>
            <Button color='danger' onClick={this.onToggleProductDeleteModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

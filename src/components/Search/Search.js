import React, { Component } from 'react';
import './Search.scss';
import { Input } from "reactstrap";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    const { search } = this.state;
    return (
      <div className='search-container'>
        <Input
          type="text"
          name={'search'}
          value={search}
          placeholder="Search..."
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

import { Component } from 'react';
import { Header } from '../Header/Header';
import { MainMenu } from '../MainMenu/MainMenu';

export class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header/>
        <MainMenu/>
      </div>
    );
  }
}
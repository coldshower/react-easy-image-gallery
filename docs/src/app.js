import React, { Component } from 'react';
import styled from 'styled-components';
import Navbar from './navbar';
import CodeBlock from './codeblock';
import Gallery from '../../src/gallery';

const Heading = styled.div`
  text-align: center;
  margin: 15rem 0 17rem 0;
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      showCode: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch('https://pixabay.com/api/?key=11039936-6e77e51408504e6821e3c708b&q=yosemite&image_type=photo&per_page=22')
      .then(res => res.json())
      .then(result => {
        this.setState({
          images: result.hits.map(image => ({
            src: image.webformatURL,
            width: image.webformatWidth,
            height: image.webformatHeight
          }))
        });
      });
  }

  handleClick() {
    this.setState({
      showCode: !this.state.showCode
    });
  }

  render() {
    const { images, showCode } = this.state;
    return (
      <div className="container">
        <Navbar />
        <Heading>
          <h1>Fast, responsive, and lightweight</h1>
          <button onClick={this.handleClick}>
            { showCode ? 'Hide ' : 'Show ' } { 'the example code' }
          </button>
        </Heading>
        <CodeBlock show={showCode} />
        <Gallery images={images} />
      </div>
    );
  }
}
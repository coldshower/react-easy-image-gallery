import React from 'react';
import styled from 'styled-components';

const CodeBlock = styled.div`
  opacity: ${props => props.show ? 1 : 0};
  height: ${props => props.show ? "auto" : 0};
  margin-top: ${props => props.show ? "-15rem" : 0};
  overflow: hidden;
`;

export default ({show}) => {
  return (
    <CodeBlock show={show}>
      <pre>
        <code className="lang-js">
          {
              
`import React, { Component } from 'react';
import Gallery from 'react-easy-image-gallery';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentDidMount() {
    fetch(SOME_API)
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

  render() {
    const { images } = this.state;
    return (
      <div className="container">
        <Gallery images={images} />
      </div>
    );
  }
}`}
        </code>
      </pre>
    </CodeBlock>
  );
}
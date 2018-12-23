import React from 'react';
import styled from 'styled-components';
import { GoMarkGithub } from 'react-icons/go';

const Nav = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Link = styled.a`
  color: #606c76;
  opacity: 0.7;

  &:hover, &:focus {
    color: #606c76;
  }

  &:hover {
    opacity: 1;
  }
`;

export default class Navbar extends React.PureComponent {
  render() {
    return (
      <Nav>
        <Link href="https://github.com/coldshower/react-easy-image-gallery" target="_blank" rel="noopener noreferrer">
          <h6>react-easy-image-gallery</h6>
        </Link>
        <Link href="https://github.com/coldshower/react-easy-image-gallery" target="_blank" rel="noopener noreferrer">
          <GoMarkGithub size="1.6em"/>
        </Link>
      </Nav>
    );
  }
}
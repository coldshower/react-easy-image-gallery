import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ImgList = styled.div`
  overflow: hidden;
`;

const ImgWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  margin: 5px;
  box-sizing: border-box;
  overflow: hidden;
  background: ${props => props.bgColor};
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.updateOnResize = this.updateOnResize.bind(this);

    this.debouncedResize = debounce(this.updateOnResize, 100);
  }

  componentDidMount() {
    window.addEventListener('resize', this.debouncedResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedResize);
  }

  updateOnResize() {
    if (this.isAspectRatioSame()) {
      return;
    }

    if (this.timeout) {
      window.cancelAnimationFrame(this.timeout);
    }

    this.timeout = window.requestAnimationFrame(() => {
      this.forceUpdate();
    });
  }

  isAspectRatioSame() {
    if (this.myRef.current) {
      return this.rowTotalAspectRatio === this.myRef.current.clientWidth / this.props.columnWidth;
    }
  }

  scrollbarIsAboutToAppear() {
    const { images } = this.props;
    const scrollbarIsHidden = window.innerWidth === document.body.clientWidth;

    if (scrollbarIsHidden) {
      const totalHeight = images.reduce((a, b) => { return a + b.height }, 0);
      if (totalHeight > window.innerHeight - this.myRef.current.offsetTop) {
        return true;
      }
    }
  }

  renderImages() {
    const { images, columnWidth } = this.props;
    
    let containerWidth = this.myRef.current.clientWidth;

    if (this.scrollbarIsAboutToAppear(images, this.myRef)) {
      containerWidth -= getScrollbarWidth();
    }

    this.rowTotalAspectRatio = containerWidth / columnWidth;
    const result = [];
    let currentRow = [];
    let currentRowAspectRatio = 0;

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const aspectRatio = image.width / image.height;

      currentRowAspectRatio += aspectRatio;
      currentRow.push([
        <ImgWrapper key={i} bgColor={this.props.imageLoadingColor}>
          <Img src={image.src} />
        </ImgWrapper>,
        aspectRatio
      ]);
      if (currentRowAspectRatio > this.rowTotalAspectRatio || images[i + 1] === undefined) {
        const rowAspectRatio = currentRowAspectRatio > this.rowTotalAspectRatio ? currentRowAspectRatio : this.rowTotalAspectRatio;

        for (let j = 0; j < currentRow.length; j++) {
          const Element = currentRow[j][0];
          const aspectRatio = currentRow[j][1];
          const workingWidth = containerWidth - (10 * currentRow.length);
          const width = (aspectRatio * workingWidth / rowAspectRatio);
          const height = width / aspectRatio;
          result.push(
            React.cloneElement(
              Element, 
              { style: { width, height } }
            )
          );
        }

        currentRowAspectRatio = 0;
        currentRow = [];
      }
    }
    return result;
  }

  render() {
    return (
      <ImgList ref={this.myRef}>
        { this.myRef.current && this.renderImages() }
      </ImgList>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    })
  ).isRequired,
  columnWidth: PropTypes.number,
  imageLoadingColor: PropTypes.string
};

Gallery.defaultProps = {
  columnWidth: 250,
  imageLoadingColor: '#f3f3f3'
};

function getScrollbarWidth() {
  return 17;
}

function debounce(fn, ms) {
  let debounceTimeout;
  let timeSinceLastCalledFn;

  return (...args) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      fn.apply(null, args);
    }, ms);
  }
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var ImgList = _styledComponents.default.div.withConfig({
  displayName: "gallery__ImgList",
  componentId: "m47xb1-0"
})(["overflow:hidden;"]);

var ImgWrapper = _styledComponents.default.div.withConfig({
  displayName: "gallery__ImgWrapper",
  componentId: "m47xb1-1"
})(["display:inline-block;vertical-align:top;margin:5px;box-sizing:border-box;overflow:hidden;background:", ";"], function (props) {
  return props.bgColor;
});

var Img = _styledComponents.default.img.withConfig({
  displayName: "gallery__Img",
  componentId: "m47xb1-2"
})(["width:100%;height:100%;"]);

var Gallery =
/*#__PURE__*/
function (_Component) {
  _inherits(Gallery, _Component);

  function Gallery(props) {
    var _this;

    _classCallCheck(this, Gallery);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Gallery).call(this, props));
    _this.myRef = _react.default.createRef();
    _this.updateOnResize = _this.updateOnResize.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.debouncedResize = debounce(_this.updateOnResize, 100);
    return _this;
  }

  _createClass(Gallery, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.debouncedResize);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.debouncedResize);
    }
  }, {
    key: "updateOnResize",
    value: function updateOnResize() {
      var _this2 = this;

      if (this.isAspectRatioSame()) {
        return;
      }

      if (this.timeout) {
        window.cancelAnimationFrame(this.timeout);
      }

      this.timeout = window.requestAnimationFrame(function () {
        _this2.forceUpdate();
      });
    }
  }, {
    key: "isAspectRatioSame",
    value: function isAspectRatioSame() {
      if (this.myRef.current) {
        return this.rowTotalAspectRatio === this.myRef.current.clientWidth / this.props.columnWidth;
      }
    }
  }, {
    key: "scrollbarIsAboutToAppear",
    value: function scrollbarIsAboutToAppear() {
      var images = this.props.images;
      var scrollbarIsHidden = window.innerWidth === document.body.clientWidth;

      if (scrollbarIsHidden) {
        var totalHeight = images.reduce(function (a, b) {
          return a + b.height;
        }, 0);

        if (totalHeight > window.innerHeight - this.myRef.current.offsetTop) {
          return true;
        }
      }
    }
  }, {
    key: "renderImages",
    value: function renderImages() {
      var _this$props = this.props,
          images = _this$props.images,
          columnWidth = _this$props.columnWidth;
      var containerWidth = this.myRef.current.clientWidth;

      if (this.scrollbarIsAboutToAppear(images, this.myRef)) {
        containerWidth -= getScrollbarWidth();
      }

      this.rowTotalAspectRatio = containerWidth / columnWidth;
      var result = [];
      var currentRow = [];
      var currentRowAspectRatio = 0;

      for (var i = 0; i < images.length; i++) {
        var image = images[i];
        var aspectRatio = image.width / image.height;
        currentRowAspectRatio += aspectRatio;
        currentRow.push([_react.default.createElement(ImgWrapper, {
          key: i,
          bgColor: this.props.imageLoadingColor
        }, _react.default.createElement(Img, {
          src: image.src
        })), aspectRatio]);

        if (currentRowAspectRatio > this.rowTotalAspectRatio || images[i + 1] === undefined) {
          var rowAspectRatio = currentRowAspectRatio > this.rowTotalAspectRatio ? currentRowAspectRatio : this.rowTotalAspectRatio;

          for (var j = 0; j < currentRow.length; j++) {
            var Element = currentRow[j][0];
            var _aspectRatio = currentRow[j][1];
            var workingWidth = containerWidth - 10 * currentRow.length;
            var width = _aspectRatio * workingWidth / rowAspectRatio;
            var height = width / _aspectRatio;
            result.push(_react.default.cloneElement(Element, {
              style: {
                width: width,
                height: height
              }
            }));
          }

          currentRowAspectRatio = 0;
          currentRow = [];
        }
      }

      return result;
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(ImgList, {
        ref: this.myRef
      }, this.myRef.current && this.renderImages());
    }
  }]);

  return Gallery;
}(_react.Component);

exports.default = Gallery;
Gallery.propTypes = {
  images: _propTypes.default.arrayOf(_propTypes.default.shape({
    src: _propTypes.default.string.isRequired,
    width: _propTypes.default.number.isRequired,
    height: _propTypes.default.number.isRequired
  })).isRequired,
  columnWidth: _propTypes.default.number,
  imageLoadingColor: _propTypes.default.string
};
Gallery.defaultProps = {
  columnWidth: 250,
  imageLoadingColor: '#f3f3f3'
};

function getScrollbarWidth() {
  return 17;
}

function debounce(fn, ms) {
  var debounceTimeout;
  var timeSinceLastCalledFn;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(function () {
      fn.apply(null, args);
    }, ms);
  };
}

//# sourceMappingURL=gallery.js.map
# react-easy-image-gallery
A beautiful &lt;Gallery /> inspired by layouts of flickr and Google Photos

![downloads](https://img.shields.io/npm/dm/react-easy-image-gallery.svg)

![screenshot](https://i.imgur.com/b2R9NwS.jpg)

Features:

- responsive without scaling down pictures like other libraries
- works with images of varying aspect ratios
- 8kb unminified
- works on Chrome, Firefox, Edge, and IE10

## Live Demo and Example

https://coldshower.github.io/react-easy-image-gallery

## Installation

`npm install react-easy-image-gallery` 

## Using it

```jsx
import { Gallery } from 'react-easy-image-gallery';

// ...
<Gallery 
  images={[
    { 
      src: 'SOME_URL',
      width: 540,
      height: 1000
    },
    {
      src: 'SOME_OTHER_URL',
      width: 200,
      height: 121
    },
    ...etc
  ]}
/>
// ...
```

Check the [demo](https://coldshower.github.io/react-easy-image-gallery) for a more real life example!

## Props

| Name             | Type          | Default  | Description |
|:------------------|:-------------:|:--------:|:----------- |
| images`required` | array         |          |is an array of objects with the keys src, width, and height |
| columnWidth      | number        |   250    |default usually will suffice but if you want each picture to take up more room in a row, then increase this until satisfied |
| imageLoadingColor  | string      |`#f3f3f3` | background color of image placeholder while the image is loading |

## Contributing

1. Clone the repository
2. `nvm use` and `npm install`
3. `npm start` and open `localhost:8080`
4. Submit a pull request

## Notes

Stock photos are from Pixabay's Developer API and can be found here https://pixabay.com/en/photos/yosemite/.

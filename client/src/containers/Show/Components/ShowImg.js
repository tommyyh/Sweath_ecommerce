import React, { useRef } from 'react';

import Img from '../../../components/HtmlTags/Img';

const ShowImg = ({ productImg, productAlt }) => {
  const imageContRef = useRef(); // Whole image ref

  // Zoom on hover
  const imageZoom = (e) => {
    const productImg = e.target.getBoundingClientRect();
    const mouseX = e.clientX - productImg.left;
    const mouseY = e.clientY - productImg.top;

    imageContRef.current.children[0].style.transform = 'scale(1.77)';
    imageContRef.current.children[0].style.transformOrigin = `${mouseX}px ${mouseY}px`;
  };

  const imageZoomOut = () => {
    imageContRef.current.children[0].style.transform = 'initial';
    imageContRef.current.children[0].style.transformOrigin = 'initial';
  };

  return (
    <div
      className='show_img'
      ref={imageContRef}
      onMouseMove={imageZoom}
      onMouseLeave={imageZoomOut}
    >
      <Img imageSrc={productImg} imageAlt={productAlt} />
    </div>
  );
};

export default ShowImg;

import React from 'react';
import cooper from '../assets/postman-cooper-fallback.jpg';

const FluidImage = ({ image, ...props }) => {
  // Return fallback Image, if no Image is given.
  if (!image) {
    return (
      <img
        loading="lazy"
        src={cooper}
        alt="Postman Cooper Fallback"
        {...props}
      />
    );
  }

  if (image && image.imageFile) {
    return (
      <img
        loading="lazy"
        fluid={image.imageFile.childImageSharp.fluid}
        alt={image.altText}
        {...props}
      />
    );
  }

  return <img src={image.sourceUrl} alt={image.altText} {...props} />;
};

export default FluidImage;

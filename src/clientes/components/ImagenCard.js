import React, { useState } from "react";

const ImageCard = ({ imageUrl, altText }) => {
  const [isLarge, setIsLarge] = useState(false);

  const toggleImageSize = () => {
    setIsLarge(!isLarge);
  };

  return (
    <div className=" my-1 p-1">
      <div className={`cursor-pointer  overflow-hidden transition-transform duration-300 ${isLarge ? "transform scale-150" : ""}`}
        onClick={toggleImageSize}
      >
        <img
          src={imageUrl}
          alt={altText}
          className={`w-1/8 h-1/8 object-cover transition-transform duration-300 ${
            isLarge ? "h-96" : "h-48"
          }`}
        />
      </div>
    </div>
  );
};

export default ImageCard;

import React, { useState } from "react";

const ImageGalleryModal = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  return (

    <div>
    {/* Thumbnails */}
    <div className="flex space-x-4">
  
        <img
     
          src={images}
          alt={`fotos`}
          className="w-24 h-24 object-cover cursor-pointer rounded-lg shadow"
          onClick={() => openModal(images)}
        />
  
    </div>

    {/* Modal */}
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white p-4 rounded-lg shadow-lg">
          <button
            onClick={closeModal}
            className="absolute top-0 right-0 m-2 bg-gray-200 px-1 rounded font-bold text-green-400 hover:text-green-600"
          >
            X
          </button>
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-full max-h-full rounded-lg"
          />
        </div>
      </div>
    )}
  </div>
  );
};

export default ImageGalleryModal;
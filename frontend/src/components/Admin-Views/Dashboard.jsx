import React, { useState } from "react";

const ImageUpload = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file!");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB!");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[index] = reader.result;
          return newImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="font-bold">Add Product</h1>
      <div className="flex justify-center">
      <div className="p-6 w-full max-w-2xl">
        <h2 className="text-center text-xl font-semibold text-gray-700">Upload Product Images</h2>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-20 w-full sm:w-48 flex justify-center items-center p-2 border rounded-md shadow-md bg-gray-50">
              <div className="relative left-12">
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleImageChange(index, event)}
                className=" text-sm text-gray-600"
              />
              </div>
              {images[index] && (
                <div className="relative mt-2">
                  <img src={images[index]} alt="Preview" className="w-full h-24 object-cover rounded" />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <label className="block font-medium">Product Name</label>
          <input className="w-full px-3 py-2 border rounded mt-1" type="text" placeholder="Enter product name" required />
        </div>

        <div className="mt-4">
          <label className="block font-medium">Product Description</label>
          <textarea className="w-full px-3 py-2 border rounded mt-1" placeholder="Write product description" required></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block font-medium">Category</label>
            <select className="w-full px-3 py-2 border rounded mt-1">
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Sub Category</label>
            <select className="w-full px-3 py-2 border rounded mt-1">
              <option>Topwear</option>
              <option>Bottomwear</option>
              <option>Winterwear</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Price (INR)</label>
            <input className="w-full px-3 py-2 border rounded mt-1" type="number" placeholder="Enter price" />
          </div>
        </div>
        <div className="mt-4">
          <label className="block font-medium">Available Sizes</label>
          <div className="flex flex-wrap gap-3 mt-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <span key={size} className="bg-gray-200 px-3 py-2 rounded shadow-md cursor-pointer">
                {size}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center mt-4">
          <input type="checkbox" id="bestseller" className="mr-2" />
          <label htmlFor="bestseller" className="cursor-pointer font-medium">
            Add to Bestseller
          </label>
        </div>

        <div className="flex justify-center mt-6">
          <button className="cursor-pointer px-6 py-2 bg-black text-white rounded shadow-md hover:bg-gray-800 transition">
            ADD PRODUCT
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ImageUpload;

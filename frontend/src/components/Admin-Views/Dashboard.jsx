import React, { useState } from "react";

const ImageUpload = () => {
  const [images, setImages] = useState([null, null, null, null]);

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
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

  return (
    <div className="left-2  mt-7 max-w-3xl mx-auto bg-white text-black shadow-md rounded-md p-6 h-[90vh] overflow-y-auto">
      <button className="absolute top-2 right-6 bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-grey-600">
        Logout
      </button>
      <p className=" font-semibold ">Upload Images</p>
      <div className="mt-2 flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="mt-2 p-3 border rounded shadow-md w-32 text-center"
          >
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleImageChange(index, event)}
              className="mb-2 w-full"
            />
            {image && (
              <img
                src={image}
                alt="Preview"
                className="w-full h-20 object-cover rounded mb-2"
              />
            )}
            <button className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
              Upload
            </button>
          </div>
        ))}
      </div>

      <div className="w-full mt-4">
        <p className="mt-6">Product Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2 mt-1 border rounded"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mt-5">Product Description</p>
        <textarea
          className="mt-1 w-full max-w-[500px] px-3 py-2 border rounded"
          placeholder="Write content here"
          required
        ></textarea>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
        <div>
          <p className="mb-2">Product Category</p>
          <select className="w-full px-3 py-2 border rounded ">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub Category</p>
          <select className="w-full px-3 py-2 border rounded text-black">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price (INR)</p>
          <input
            className="w-full px-3 py-2 border rounded text-black"
            type="number"
            placeholder="Enter Price"
          />
        </div>
      </div>

      <div className="mt-5">
        <p>Product Sizes</p>
        <div className="flex flex-wrap gap-3 text-black">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <p
              key={size}
              className="bg-gray-200 mt-2 px-4 py-2 cursor-pointer rounded shadow-md text-center"
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <input type="checkbox" id="bestseller" />
        <label className="cursor-pointer" htmlFor="bestseller">
          <b>Add to Bestseller</b>
        </label>
      </div>

      <div className="flex justify-center mt-6">
        <button type="submit" className="px-6 py-2 bg-black text-white rounded">
          ADD PRODUCT
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;

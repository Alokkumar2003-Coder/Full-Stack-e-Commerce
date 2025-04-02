import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const AdminProductUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch product details
  const { data: productData, isLoading, error } = useGetProductByIdQuery(id);
  const { data: categories = [] } = useFetchCategoriesQuery();

  // State variables
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");

  // RTK Query Mutations
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  // Populate state when product data is loaded
  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id || ""); // Fix: Ensure category ID is set
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setStock(productData.countInStock);
      setImage(productData.image);
    }
  }, [productData]);

  // Handle image upload
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully");
      setImage(res.image);
    } catch (err) {
      toast.error("Image upload failed");
    }
  };

  // Handle product update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedProduct = {
        _id: id,
        name,
        description,
        price,
        category,
        quantity,
        brand,
        countInStock: stock,
        image,
      };

      const result = await updateProduct(updatedProduct);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Product successfully updated");
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      toast.error("Product update failed");
    }
  };

  // Handle product deletion
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const { data } = await deleteProduct(id);
      toast.success(`"${data.name}" deleted`);
      navigate("/admin/allproductslist");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 flex justify-center w-full">
      <div className="w-full">
        
        <div className="w-full p-3">
          <h2 className="text-xl font-bold">Update / Delete Product</h2>

          {isLoading && <p>Loading product...</p>}
          {error && <p className="text-red-500">Error fetching product</p>}

          {image && (
            <div className="text-center">
              <img src={image} alt="product" className="block mx-auto w-full h-[40%]" />
            </div>
          )}

          <div className="mb-3 mt-10">
            <label className="bg-blue-400 text-white block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              Upload image
              <input type="file" name="image" accept="image/*" onChange={uploadFileHandler} className="hidden" />
            </label>
          </div>

          <div className="p-3">
            <label>Name</label>
            <input
              type="text"
              className="p-4 mb-3 w-full border rounded-lg text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Price</label>
            <input
              type="number"
              className="p-4 mb-3 w-full border rounded-lg text-black"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <label>Quantity</label>
            <input
              type="number"
              min="1"
              className="p-4 mb-3 w-full border rounded-lg text-black"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <label>Brand</label>
            <input
              type="text"
              className="p-4 mb-3 w-full border rounded-lg text-black"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />

            <label>Description</label>
            <textarea
              className="p-2 mb-3 w-full border rounded-lg text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>Count In Stock</label>
            <input
              type="number"
              className="p-4 mb-3 w-full border rounded-lg text-black"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />

            <label>Category</label>
            <select
              className="p-4 mb-3 w-full border rounded-lg text-black"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <div className="mt-5 flex space-x-4 w-full">
              <button onClick={handleSubmit} className="text-white py-4 w-full px-10 rounded-lg text-lg font-bold bg-green-600">
                Update
              </button>
              <button onClick={handleDelete} className="text-white w-full py-4 px-10 rounded-lg text-lg font-bold bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;

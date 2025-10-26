import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../../utils/mediaUpload";

export default function AddProductForm() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [alternativeNames, setAlternativeNames] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [lastPrice, setLastPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit() {
    if (!productName || !price || !stock) {
      toast.error("Please fill required fields!");
      return;
    }

    // Split alternative names into array
    const altNames = alternativeNames
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean);

    try {
      // Upload images to Supabase
      const promises = Array.from(imageFiles).map((file) =>
        uploadMediaToSupabase(file)
      );
      const imgUrls = await Promise.all(promises);

      const product = {
        productId,
        productName,
        altNames,
        images: imgUrls,
        price,
        lastPrice,
        stock,
        description,
      };

      const token = localStorage.getItem("token");

      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/products",
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.error || "Failed to add product. Try again."
      );
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Add Product
        </h1>

        <div className="space-y-4">
          {/* Product ID */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Product ID</label>
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter product ID"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Product Name */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              Product Name *
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Alternative Names */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              Alternative Names
            </label>
            <input
              type="text"
              value={alternativeNames}
              onChange={(e) => setAlternativeNames(e.target.value)}
              placeholder="Enter alternative names, comma separated"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Images */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImageFiles(e.target.files)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Price *</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Last Price */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Last Price</label>
            <input
              type="number"
              value={lastPrice}
              onChange={(e) => setLastPrice(e.target.value)}
              placeholder="Enter last price"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Stock */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Stock *</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Enter stock count"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="w-full px-4 py-2 border rounded-md h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}

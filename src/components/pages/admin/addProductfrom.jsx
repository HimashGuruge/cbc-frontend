import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../../utils/mediaUpload";

export default function AddProductform() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [alternativeNames, setAlternativeNames] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [lastPrice, setLastPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setFileImage] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit() {
    const alterNames = alternativeNames.split(",");

    const promisesArray = [];

    for (let i = 0; i < imageFile.length; i++) {
      promisesArray[i] = uploadMediaToSupabase(imageFile[i]);
    }

    const imgUrls = await Promise.all(promisesArray);

    console.log(imgUrls);

    const product = {
      productId: productId,
      productName: productName,
      altNames: alterNames,
      images: imgUrls,
      price: price,
      lastPrice: lastPrice,
      stock: stock,
      description: description,
    };

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/products",
        product,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      navigate("/admin/products");
      toast.success("Product added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to added product");

      // toast.error(error.response.data.error);
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Add Product
        </h1>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Product ID</label>
            <input
              type="text"
              value={productId}
              onChange={(e) => {
                setProductId(e.target.value);
              }}
              placeholder="Enter product ID"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
              placeholder="Enter product name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              Alternative Names
            </label>
            <input
              type="text"
              value={alternativeNames}
              onChange={(e) => {
                setAlternativeNames(e.target.value);
              }}
              placeholder="Enter alternative names"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Image URL</label>
            <input
              type="file"
              multiple
              onChange={(e) => {
                setFileImage(e.target.files);
              }}
              placeholder="Enter image URL"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              placeholder="Enter price"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Last Price</label>
            <input
              type="number"
              value={lastPrice}
              onChange={(e) => {
                setLastPrice(e.target.value);
              }}
              placeholder="Enter last price"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
              }}
              placeholder="Enter stock count"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Enter product description"
              className="w-full px-4 py-2 border rounded-md h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
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

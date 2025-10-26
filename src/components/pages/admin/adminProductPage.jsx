import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);

  useEffect(() => {
    if (!productsLoaded) {
      axios
        .get("cbc-backend-daac.up.railway.app/api/products")
        .then((res) => {
          setProducts(res.data);
          console.log(res.data);
          setProductsLoaded(true);
        })
        .catch((err) => console.log(err));
    }
  }, [productsLoaded]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 relative">
      {/* Add Product Button */}
      <Link
        to={"/admin/products/addproduct"}
        className="absolute right-[25px] bottom-[25px] text-[30px] bg-blue-600 text-white p-5 rounded-xl hover:bg-blue-700"
      >
        <FaPlus />
      </Link>

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🛍️ Admin Product Page
        </h1>

        {productsLoaded ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Product ID</th>
                  <th className="py-3 px-4 text-left">Product Name</th>
                  <th className="py-3 px-4 text-right">Price (Rs)</th>
                  <th className="py-3 px-4 text-right">Last Price</th>
                  <th className="py-3 px-4 text-center">Stock</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product._id || index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{product.productId}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {product.productName}
                    </td>
                    <td className="py-3 px-4 text-right text-green-600 font-semibold">
                      Rs {product.price.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right line-through text-gray-500">
                      Rs {product.lastPrice.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-semibold ${
                          product.stock > 50
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 max-w-sm truncate">
                      {product.description}
                    </td>

                    {/* ✅ Combined Action Buttons */}
                    <td className="py-3 px-4 text-center flex gap-3 justify-center">
                      <button
                        onClick={() => {
                          alert(product.productId);
                          const token = localStorage.getItem("token");

                          axios
                            .delete(
                              import.meta.env.VITE_BACKEND_URL +
                                `/api/products/${product.productId}`,
                              {
                                headers: {
                                  Authorization: "Bearer " + token,
                                },
                              }
                            )
                            .then((res) => {
                              console.log(res.data);
                              toast.success("Product deleted successfully");
                              setProductsLoaded(false);
                            })
                            .catch((err) => console.log(err));
                        }}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <FaTrash />
                      </button>

                      <button className="text-blue-500 hover:text-blue-700 transition">
                        <FaPen />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-[60px] h-[60px] border-[10px] border-gray-300 animate-spin border-b-blue-600 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}

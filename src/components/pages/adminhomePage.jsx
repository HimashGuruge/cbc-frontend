import { BsGraphUp } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { MdInventory2, MdPeopleAlt } from "react-icons/md";
import { Link, Route, Routes } from "react-router-dom";
import AddProductform from "./admin/addProductfrom";
import AdminProductPage from "./admin/adminProductPage";

export default function AdminHomePage() {
  return (
    <div className="bg-blue-200 w-full h-screen flex">
      {/* Sidebar */}
      <div className="w-[20%] h-screen bg-blue-500 flex flex-col  p-4 gap-4 text-white text-lg font-medium items-center">
        
        <Link to="/admin/dashboard" className="flex items-center gap-2 hover:text-gray-200">
          <BsGraphUp />
          Dashboard
        </Link>

        <Link to="/admin/products" className="flex items-center gap-2 hover:text-gray-200">
          <MdInventory2 />
          Products
        </Link>

        <Link to="/admin/orders" className="flex items-center gap-2 hover:text-gray-200">
          <FaClipboardList />
          Orders
        </Link>

        <Link to="/admin/customers" className="flex items-center gap-2 hover:text-gray-200">
          <MdPeopleAlt />
          Customers
        </Link>

      </div>

      {/* Main content area */}
      <div className="w-[80%] h-screen ">


        <Routes path="/*" >
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/products" element={<AdminProductPage />} />
        <Route path="/products/addproduct" element={<AddProductform/>} />
        <Route path="/orders" element={<div>Orders</div>} />
        <Route path="/customers" element={<div>Customers</div>} /> 

        <Route path="/*" element={<div>404 not found page </div>} /> 

        </Routes>

      </div>
    </div>
  );
}

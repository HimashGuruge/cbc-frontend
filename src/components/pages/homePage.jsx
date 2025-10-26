import { Routes } from "react-router-dom";
import Header from "../header";

export default function () {
  return (
    <div className="h-screen w-full">
      <Header />

      <Routes path="/*"></Routes>
    </div>
  );
}

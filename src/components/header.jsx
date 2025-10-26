import { Link } from "react-router-dom";

export default function () {
  return (
    <header className="bg-white w-full h-[100px] relative flex  justify-center items-center">
      <img
        src="logo.png"
        alt=""
        className="cursor-pointer h-full rounded-full absolute
        left-[10px] "
      />

      <div className="h-full  flex items-center w-[500px] justify-evenly">
        <Link
          className="text-accent font-bold text-xl hover:border-b border-accent"
          to="/"
        >
          Home
        </Link>

        <Link
          className="text-accent font-bold text-xl hover:border-b border-accent"
          to="/"
        >
          Products
        </Link>
        <Link
          className="text-accent font-bold text-xl hover:border-b border-accent"
          to="/"
        >
          About Us
        </Link>

        <Link
          className="text-accent font-bold text-xl hover:border-b border-accent"
          to="/"
        >
          Contact Us
        </Link>
      </div>
    </header>
  );
}

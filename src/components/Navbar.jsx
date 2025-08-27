import {BookIcon, ChartBarIcon, Home, Info, Library, PlusIcon} from "lucide-react";
import {Link} from "react-router";

const Navbar = () => {
  return (
    <aside className="bg-[#7DB8E8]/70 backdrop-blur-md fixed top-0 left-0 md:w-48 w-20 h-screen flex flex-col p-5 text-xl shadow-lg">
      <Link className=" text-2xl md:text-left  font-bold mb-8" to={"/"}>
        <span className="hidden md:inline">BookNest</span>
        <BookIcon className="md:hidden"/>
      </Link>
      <nav className="flex flex-col gap-4 ">
        <Link
          className="hover:text-gray-600 flex items-center space-x-2"
          to={"/"}
        >
          <Home /> <span className="hidden md:inline">Home</span>
        </Link>
        <Link
          className=" hover:text-gray-600 flex items-center space-x-2"
          to={"/about"}
        >
          <Info /> <span className="hidden md:inline">About</span>
        </Link>
        <Link
          className="hover:text-gray-600 flex items-center space-x-2"
          to={"/library"}
        >
          <Library /> <span className="hidden md:inline">Library</span>
        </Link>
        <Link
          className="hover:text-gray-600 flex items-center space-x-2"
          to={"/add-book"}
        >
          <PlusIcon />
          <span className="hidden md:inline">Add Book</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Navbar;

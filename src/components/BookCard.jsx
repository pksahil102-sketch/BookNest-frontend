import {Link} from "react-router";
import Dropdown from "./Dropdown";
import axios from "axios";
import {useState, useEffect} from "react";
import {toast} from "react-toastify";

const BookCard = ({book, onStatusChange}) => {
  const [status, setStatus] = useState(book.status || "To Read");

  // if parent updates book.status, keep in sync
  useEffect(() => {
    setStatus(book.status || "To Read");
  }, [book.status]);

  const handleChange = async (newStatus) => {
    try {
      await axios.patch(
        `http://localhost:8080/api/v1/books/${book._id}/status`,
        {
          status: newStatus,
        }
      );

      setStatus(newStatus);

      // pass back to parent (optional for stats updates in Home)
      if (onStatusChange) onStatusChange(book._id, newStatus);

      toast("Status updated ");
    } catch (err) {
      toast.error("Failed to update ");
    }
  };

  return (
    <article className="w-full h-auto bg-[#afcce3] text-gray-950 p-6 hover:shadow-lg transition-shadow rounded-lg">
      <Link to={`/books/${book._id}`}>
        <img
          src={`http://localhost:8080${book.image}`}
          alt={book.title}
          className="w-32 h-48 rounded-md object-cover shadow sm:w-full sm:h-auto"
        />
      </Link>
      <h2 className="text-lg my-2 font-semibold text-center">
        <Link to={`/books/${book._id}`}>{book.title}</Link>
      </h2>
      <h4 className="text-center">{book.author}</h4>
      <div className="flex justify-center mt-2">
        <p className="inline-block mt-3 px-3 py-1 text-xs font-semibold shadow-sm  bg-purple-400 rounded-full text-center">
          {book.genre}
        </p>
      </div>
      <div className="flex items-center justify-center mt-4">
        <Dropdown value={status} onChange={handleChange} />
      </div>
    </article>
  );
};

export default BookCard;

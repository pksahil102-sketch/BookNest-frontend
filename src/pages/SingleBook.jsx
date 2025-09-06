import { LibraryBigIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Dropdown from "../components/Dropdown";
import NotesSection from "../components/NotesSection";
import { toast } from "react-toastify";

const SingleBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("To Read");
  const navigate = useNavigate();
  const handleStateChange = async (newStatus) => {
    setStatus(newStatus);
    try {
      await axios.patch(
        `https://booknest-backend-i5ev.onrender.com/api/v1/books/${book._id}/status`,
        { status: newStatus }
      );

      // update book object in state too
      setBook((prev) => ({ ...prev, status: newStatus }));

      toast("Status Updated Successfully!");
    } catch (error) {
      toast.error("Error Updating Status");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(
    function () {
      async function fetchSingleBook() {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `https://booknest-backend-i5ev.onrender.com/api/v1/books/${id}`
          );
          setBook(response.data);
          setStatus(response.data.status || "Status");

          console.log(response.data);
        } catch (error) {
          console.log(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchSingleBook();
    },
    [id]
  );

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BA2243] mx-auto"></div>
      </div>
    );
  }

  async function deleteBook(id) {
    try {
      await axios.delete(
        `https://booknest-backend-i5ev.onrender.com/api/v1/books/${id}`
      );
      navigate("/library");
      toast("Book deleted successfully");
    } catch (error) {
      toast.error("Error in Deleting book");
    }
  }
  if (!book) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Book Not Found
        </h1>
        <Link
          to={"/library"}
          className="bg-[#012e53] text-xl text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0a5593] transition-colors"
        >
          Back to Library
          <span>
            <LibraryBigIcon size={32} />
          </span>
        </Link>
      </div>
    );
  }
  const { title, _id, author, genre, createdAt } = book;
  return (
    <main className="space-y-4">
      {/* Notes section */}
      <div className="ml-48 bg-white py-2 px-4 rounded-lg h-auto shadow-md">
        <NotesSection bookId={book._id} />
      </div>
      <div className=" ml-48 max-w-4xl ">
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg p-8 relative">
          {/* header */}
          <div className="mb-8 ">
            <Link
              to={"/library"}
              className="text-[#BA2243] hover:text-[#de5a76] mb-4 flex items-center gap-1"
            >
              <ArrowLeft />
              Back to Library
            </Link>

            {book.image && (
              <img
                src={`https://booknest-backend-i5ev.onrender.com${book.image}`}
                alt={title}
                className="w-full max-h-96 object-contain  rounded-lg mb-6"
              />
            )}
            <div className="flex justify-center items-center mb-2">
              <Dropdown value={status} onChange={handleStateChange} />
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-2">{title}</h1>
            <div className="flex justify-between items-center text-gray-600 mb-6">
              <div>
                <span className="text-2xl text-gray-900">By {author}</span>
              </div>
              <div className="flex justify-center items-center gap-4">
                {/* Update Button */}
                <Link
                  to={`/books/${book._id}/edit`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                >
                  Edit Book
                </Link>
                {/* Delete Button */}
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer text-sm font-semibold hover:bg-red-700 transition-colors"
                  onClick={() => {
                    deleteBook(_id);
                  }}
                >
                  Delete Book
                </button>
              </div>
            </div>
          </div>
          <span className="absolute bottom-2 right-4">
            {formatDate(createdAt)}
          </span>
          <span className="bg-purple-400 px-4 rounded-lg py-1 absolute top-4 right-4 text-gray-800">
            {genre}
          </span>
        </div>
      </div>
    </main>
  );
};

export default SingleBook;

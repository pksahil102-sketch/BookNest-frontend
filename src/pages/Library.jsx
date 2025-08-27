import BookCard from "../components/BookCard";
import {LibraryBigIcon} from "lucide-react";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router";

const Library = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchAllBooks() {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:8080/api/v1/books");
        setAllBooks(response.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAllBooks();
  }, []);

  return (
    <main className="ml-48">
      <h2 className="text-4xl font-bold mb-4">
        <div className="flex items-center justify-center gap-4">
          Library
          <LibraryBigIcon size={32} />
        </div>
      </h2>
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BA2243] mx-auto"></div>
        </div>
      ) : allBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No books available yet.</p>
          <Link
            to="/add-book"
            className="bg-[#012e53] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#095da1] transition-colors"
          >
            Add the First Book
          </Link>
        </div>
      )}
    </main>
  );
};

export default Library;

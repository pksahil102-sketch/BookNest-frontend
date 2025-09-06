import { Library } from "lucide-react";
import { Link } from "react-router";
import BookCard from "../components/BookCard";
import axios from "axios";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [recentBooks, setRecentBooks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    toBeRead: 0,
    reading: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getRecentBooks() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://booknest-backend-i5ev.onrender.com/api/v1/books"
        );
        setRecentBooks(response.data);
        calculateStats(response.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getRecentBooks();
  }, []);

  const calculateStats = (booksData) => {
    const total = booksData.length;

    const completed = booksData.filter((b) => b.status === "Completed").length;

    const toBeRead = booksData.filter((b) => b.status === "To Read").length;

    const reading = booksData.filter((b) => b.status === "Reading").length;

    setStats({ total, completed, toBeRead, reading });
  };

  const handleStatusChange = (bookId, newStatus) => {
    const updatedBooks = recentBooks.map((b) =>
      b._id === bookId ? { ...b, status: newStatus } : b
    );
    setRecentBooks(updatedBooks);
    calculateStats(updatedBooks); // updates total/read/to be read
  };

  return (
    <div>
      <main className=" ml-48 flex-cols items-center ">
        {/* hero section */}
        <section className=" h-auto flex-1  p-6 bg-[#276291]">
          <h2 className="text-4xl text-[#B5DEFF] font-bold  ">
            <div className="flex gap-4 items-center justify-center">
              Welcome To Your Digital Library <Library size={34} />
            </div>
          </h2>
          <p className=" text-xl text-[#B5DEFF] text-center mt-4">
            Track, manage, and explore your personal book collection.
          </p>
        </section>
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
          <div className="bg-white shadow-md rounded-xl p-4 text-center">
            <h2 className="text-xl font-bold text-[#276291]">{stats.total}</h2>
            <p className="text-[#7DB8E8]">Total Books</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-4 text-center">
            <h2 className="text-xl font-bold text-[#276291]">
              {stats.completed}
            </h2>
            <p className="text-[#7DB8E8]">Completed</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-4 text-center">
            <h2 className="text-xl font-bold text-[#276291]">
              {stats.toBeRead}
            </h2>
            <p className="text-[#7DB8E8]">To Be Read</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-4 text-center">
            <h2 className="text-xl font-bold text-[#276291]">
              {stats.reading}
            </h2>
            <p className="text-[#7DB8E8]">Reading</p>
          </div>
        </section>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recently Added
        </h2>
        <section className="p-4 bg-[#BA2243]">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#BA2243] mx-auto"></div>
            </div>
          ) : recentBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {recentBooks.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  onStatusChange={handleStatusChange}
                />
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

          {recentBooks.length > 0 && (
            <div className="flex justify-center items-center">
              <Link
                to={"/library"}
                className="text-xl text-[#f0e8f0] font-semibold bg-[#012e53] px-3 py-1 rounded-lg  hover:bg-[#225279] transition-colors"
              >
                View all
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;

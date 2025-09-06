import { BookHeart } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState(null);
  const [preview, setPreview] = useState(null);
  const [genre, setGenre] = useState("");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  //handle submit handles the data after submitting the form
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("genre", genre);
      formData.append("status", "To Read"); // match enum in schema
      if (cover) {
        formData.append("image", cover); // MUST match backend field name
      }

      await axios.post(
        "https://booknest-backend-i5ev.onrender.com/api/v1/books",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      navigate("/library");
      toast("New Book Added ");
    } catch (error) {
      console.error(error);
      toast.error("Some Error occurred ");
    } finally {
      setIsLoading(false);
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCover(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <main className="ml-48 mx-w-2xl h-auto">
      <h2 className="text-2xl text-center font-bold mb-4">
        Add a New Book <BookHeart className="inline-block" />
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-blue-50 rounded-lg shadow-md p-6"
      >
        {/* Title */}
        <div>
          <label htmlFor="title" className="text-xl font-semibold">
            Title<span className="text-red-600">*</span>
          </label>
          <input
            className="p-2 mt-2 border border-gray-300 rounded-lg bg-white w-full focus:ring-blue-400 focus:border-transparent"
            type="text"
            placeholder="Enter Title"
            required
            value={title}
            name="title"
            id="title"
            onChange={function (e) {
              setTitle(e.target.value);
            }}
          />
        </div>
        {/* Author */}
        <div className="mt-2">
          <label htmlFor="author" className="text-xl font-semibold">
            Author<span className="text-red-600">*</span>
          </label>
          <input
            className="p-2 mt-2 border border-gray-300 rounded-lg bg-white w-full focus:ring-blue-400 focus:border-transparent"
            type="text"
            placeholder="Enter Author"
            required
            value={author}
            name="author"
            id="author"
            onChange={function (e) {
              setAuthor(e.target.value);
            }}
          />
        </div>
        {/* Genre */}
        <div className="mt-2">
          <label htmlFor="genre" className="text-xl font-semibold">
            Genre
          </label>
          <input
            className="p-2 mt-2 border border-gray-300 rounded-lg bg-white w-full focus:ring-blue-400 focus:border-transparent"
            type="text"
            value={genre}
            placeholder="Enter Genre"
            name="genre"
            id="genre"
            onChange={function (e) {
              setGenre(e.target.value);
            }}
          />
        </div>
        {/*  Cover Image */}
        <div className="mt-2">
          <label htmlFor="cover" className="text-xl font-semibold">
            Cover Image
          </label>
          <input
            className="p-2 mt-2 border border-gray-300 rounded-lg bg-white w-full focus:ring-blue-400 focus:border-transparent"
            type="file"
            accept="image/*"
            name="cover"
            id="cover"
            onChange={handleFileChange}
          />
        </div>
        {/* Preview */}
        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-48 object-cover rounded shadow"
            />
          </div>
        )}

        {/* Submit */}
        <div className="text-center mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-900  text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#276291] transition-colors disabled:opacity-50"
          >
            {isLoading ? "Adding Book..." : "Add Book"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddBook;

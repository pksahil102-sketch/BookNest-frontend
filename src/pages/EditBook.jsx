import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const EditBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editBook, setEditBook] = useState({
    title: "",
    author: "",
    genre: "",
  });
  const navigate = useNavigate();

  useEffect(
    function () {
      async function editBook() {
        try {
          setIsEditing(true);
          const res = await axios.get(
            `https://booknest-backend-i5ev.onrender.com/api/v1/books/${id}`
          );
          setBook(res.data);
          setEditBook({
            title: res.data.title,
            author: res.data.author,
            genre: res.data.genre,
          });
        } catch (error) {
          console.log(error.message);
          toast.error("Some Error Ocurred");
        } finally {
          setIsEditing(false);
        }
      }
      editBook();
    },
    [id]
  );
  const handleChange = (e) => {
    setEditBook({ ...editBook, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await axios.put(
        `https://booknest-backend-i5ev.onrender.com/api/v1/books/${book._id}`,
        editBook
      );
      toast("Book Saved");
      navigate(`/books/${id}`); //go to single book page
    } catch (error) {
      console.log(error.message);
      toast.error("Some Error Occurred");
    } finally {
      setIsSaving(false);
    }
  };
  if (!book) return <p className="text-center mt-10">Loading...</p>;
  return (
    <div className=" ml-48 max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Book</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="title"
          value={editBook.title}
          onChange={handleChange}
          placeholder="Book Title"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="author"
          value={editBook.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="genre"
          value={editBook.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="w-full p-2 border rounded"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-800 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/books/${id}`)}
            className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;

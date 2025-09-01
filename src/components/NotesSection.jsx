import {useState, useEffect} from "react";
import axios from "axios";

const NotesSection = ({bookId}) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    fetchNotes();
  }, [bookId]);

  const fetchNotes = async () => {
    const res = await axios.get(
      `https://booknest-backend-2hlf.onrender.com/notes/${bookId}`
    );
    setNotes(res.data);
  };

  const addNote = async () => {
    if (!newNote.trim()) return;
    await axios.post(
      `https://booknest-backend-2hlf.onrender.com/notes/${bookId}`,
      {content: newNote}
    );
    setNewNote("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(
      `https://booknest-backend-2hlf.onrender.com/notes/${id}`
    );
    fetchNotes();
  };

  return (
    <div className="mt-6">
      <h3 className="font-bold text-lg mb-2">Notes</h3>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a note...."
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={addNote}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {notes.map((note) => (
          <li
            key={note._id}
            className="bg-gray-100 p-2 rounded flex justify-between"
          >
            <span>{note.content}</span>
            <button
              onClick={() => deleteNote(note._id)}
              className="text-red-500 text-sm"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesSection;

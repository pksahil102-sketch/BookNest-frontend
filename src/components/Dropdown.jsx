import {useState} from "react";

export default function Dropdown({value,onChange}) {
  const [isOpen, setIsOpen] = useState(false);

  const options = ["To Read", "Reading", "Completed"];

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#052a5e] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#1306be] transition"
      >
        {value} ▼
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200">
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

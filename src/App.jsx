import {BrowserRouter, Route, Routes} from "react-router";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import AddBook from "./pages/AddBook";
import Library from "./pages/Library";
import SingleBook from "./pages/SingleBook";
import {ToastContainer} from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-[#e0cadf5b] flex min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/library" element={<Library />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/books/:id" element={<SingleBook />} />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
};

export default App;

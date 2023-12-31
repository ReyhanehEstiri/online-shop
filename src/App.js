import Navbar from "./components/navbar";
import BookstoreRoutes from './components/BookstoreRoute';
import { BrowserRouter } from "react-router-dom";
import './App.css';

function App() {
  return (
    <BrowserRouter>
          <BookstoreRoutes />
          <Navbar />
      </BrowserRouter>
  );
}

export default App;
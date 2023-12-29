import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Navbar from "./components/navbar";
import Profile from "./pages/profile";
import BookstoreRoutes from './components/BookstoreRoute';
import { BrowserRouter } from "react-router-dom";
import './App.css';

function App() {
  return (
    // <div className="App">
      
      <BrowserRouter>
            <BookstoreRoutes />
            <Navbar />
        </BrowserRouter>

    // </div>
  );
}

export default App;

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Profile from "../pages/profile";
import Wishlist from '../pages/wishlist';
import Home from "../pages/home";
import Basket from "../pages/basket";
import Books from "./book.js";
import Login from "../pages/login";
import Signup from "../pages/signup.js"

function BookstoreRoutes() {
    const location = useLocation();
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/product" element={<Books />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup/>} />

        </Routes>
    );
}

export default BookstoreRoutes;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Listing from "./components/Listing";
import { CartProvider } from "./CartContext";
import Cart from "./components/Cart";
import { Link } from "react-router-dom";
import BookDetails from "./components/BookDetails";
import Search from "./components/Search"

export default function App() {

  return (
    <Router>
      <CartProvider>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/book/:bookId" element={<BookDetails />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

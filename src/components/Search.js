import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");
  const apiKey = "AIzaSyDfjo_u5xsPQ4QVThHaPGt3k6Ti9HRzQTg";
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${apiKey}`;
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axios.get(url);
      const data = response.data;
      console.log(data);

      if (data.items) {
        const newBooks = data.items.map((bookSingle) => {
          const { id, volumeInfo } = bookSingle;

          const { authors, categories, imageLinks, publishedDate, title } =
            volumeInfo;
          return {
            id: id,
            authors: authors,
            categories: categories,
            imageLinks: imageLinks,
            publishedDate: publishedDate,
            title: title,
          };
        });

        setSearchResults(newBooks);
        console.log(newBooks);
      } else {
        setSearchResults([]);
        console.log(searchResults);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchQuery, apiKey]);

  useEffect(() => {
    fetchBooks();
  }, [searchQuery, fetchBooks]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Search Results for "{searchQuery}"</h1>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;

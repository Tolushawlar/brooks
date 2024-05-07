import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Card from "antd/es/card/Card";
import Paragraph from "antd/es/typography/Paragraph";
import { Typography } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { Layout, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  SearchOutlined,
  InfoCircleFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useCart } from "../CartContext";
import { Alert, Space, Spin } from "antd";
import Title from "antd/es/skeleton/Title";

const { Text } = Typography;
const { Header } = Layout;

function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");
  const apiKey = "AIzaSyDfjo_u5xsPQ4QVThHaPGt3k6Ti9HRzQTg";
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${apiKey}`;
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart } = useCart();
  const [category, setCategory] = useState("fiction"); // Default category
  const [books, setBooks] = useState([]);

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
    return (
      <Spin style={{ marginTop: 200 }} tip="Loading" size="large">
        <div className="content" />
      </Spin>
    );
  }

  return (
    <Layout>
      <Layout>
        <Layout className="layout">
          <Header style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="logo" style={{ color: "white" }}>
              {" "}
              <Link to={"/"} style={{ fontSize: "30px" }}>
                Brooks
              </Link>
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to={"/listing"}>Listing</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<SearchOutlined />}>
                Search
              </Menu.Item>
              <Menu.Item key="3" icon={<InfoCircleFilled />}>
                About
              </Menu.Item>
            </Menu>
            <div>
              <Button type="primary" style={{ marginRight: "10px" }}>
                <Link to={"/cart"}>
                  <ShoppingCartOutlined /> {cart.length}
                </Link>
              </Button>
            </div>
          </Header>
        </Layout>
      </Layout>
      <Layout style={{ margin: 10, padding: 80 }}>
        <h1>Search Results for "{searchQuery}"</h1>
        <Row>
          {searchResults.map((result) => (
            <Card
              hoverable
              style={{ margin: 10, padding: 30, width: 500 }}
              key={result.id}
            >
              <Col>
                <img src={result.imageLinks?.thumbnail} alt="" />
                <h2>{result.title}</h2>
                <h4>Author: {result.authors}</h4>
                <p>Published: {result.publishedDate}</p>
                <Row>
                  <Link to={`/book/${result.id}`}>
                    <Button type="primary" icon={<BookOutlined />}>
                      View
                    </Button>
                  </Link>
                  <Button
                    type="primary"
                    style={{ marginRight: "10px" }}
                    onClick={() => addToCart(result)}
                  >
                    <ShoppingCartOutlined />
                    Add to cart
                  </Button>
                </Row>
              </Col>
            </Card>
          ))}
        </Row>
      </Layout>
    </Layout>
  );
}

export default SearchResults;

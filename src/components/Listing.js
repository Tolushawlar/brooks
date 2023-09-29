import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Menu, Button, Typography, Card } from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  InfoCircleFilled,
  BookOutlined,
} from "@ant-design/icons";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Select, Space } from "antd";
import { Row, Col } from "antd";
import Paragraph from "antd/es/skeleton/Paragraph";
const { Title } = Typography;

const { Header } = Layout;

function Listing() {
  const { cart, addToCart } = useCart();
  const [category, setCategory] = useState("fiction"); // Default category
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, [category]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=10`
      );

      setBooks(response.data.items);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <>
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
      <div
        style={{
          justifyContent: "center",
          alignContent: "center",
          padding: 100,
        }}
      >
        <Space wrap>
          <Select
            defaultValue="Fiction"
            style={{ width: 320, height: 50, marginBottom: 20 }}
            onChange={setCategory}
            options={[
              { value: "Fiction", label: "Ficton" },
              { value: "Action", label: "Action" },
              { value: "Romance", label: "Romance" },
              { value: "History", label: "History" },
            ]}
          />
        </Space>
        <Row gutter={2}>
          {books.map((book) => (
            <Card
              hoverable
              style={{
                width: 350,
                padding: 10,
                marginBottom: 10,
                height: 400,
                marginLeft: 30,
                border: "solid #001529 0.1px",
              }}
            >
              <img alt="example" src={book.volumeInfo.imageLinks.thumbnail} />
              <Title level={4} key={book.id}>
                {book.volumeInfo.title}
              </Title>
              <Title level={5}>{book.volumeInfo.publisher}</Title>
              <Button
                type="primary"
                style={{ marginRight: "10px" }}
                onClick={() => addToCart(book)}
              >
                <ShoppingCartOutlined />
                Add to cart
              </Button>
              <Link to={`/book/${book.id}`}>
                <Button type="default">
                  <BookOutlined />
                  View
                </Button>
              </Link>
            </Card>
          ))}
        </Row>
      </div>
    </>
  );
}

export default Listing;

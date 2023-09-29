import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const { Text } = Typography;
const { Header } = Layout;

function BookDetails() {
  const { bookId } = useParams();
  const { cart } = useCart();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBookDetails(bookId);
  }, [bookId]);

  const fetchBookDetails = async (bookId) => {
    try { 
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setBook(data.volumeInfo);
      console.log(data.volumeInfo);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  if (!book) {
    return (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    );
  }
  function removeHtmlTags(input) {
    return input.replace(/<\/?[^>]+(>|$)/g, ""); // This regular expression removes HTML tags
  }

  return (
    <Layout className="layout">
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
      <Row gutter={12} style={{ padding: "8px", overflowX: "hidden" }}>
        <Col span={2}>
          <img src={book.imageLinks.smallThumbnail} alt="" />
        </Col>
        <Col span={12}>
          <h1>{book.title}</h1>
          <p>Author: {book.authors}</p>
          <p>Description: </p> {removeHtmlTags(book.description)}
          <a href={book.previewLink} target="_blank" rel="noopener noreferrer">
            Purchase
          </a>
        </Col>
      </Row>
    </Layout>
  );
}

export default BookDetails;

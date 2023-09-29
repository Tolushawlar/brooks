import React, { useEffect, useState } from "react";
import { BookDiv } from "../styled/BookDiv";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";
import Layout from "antd/es/layout/layout";
import { Alert, Button, Space, Spin } from "antd";
import Card from "antd/es/card/Card";
import Paragraph from "antd/es/typography/Paragraph";
import { Typography } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { Menu } from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  InfoCircleFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { Header } = Layout;


const BookList = () => {
  const cart = useCart();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const trimText = (text) => {
    return text.length > 80 ? text.slice(0, 30) + "..." : text;
  };

  useEffect(() => {
    const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=react";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <BookDiv>
        {loading ? (
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        ) : (
          <Row gutter={16}>
            {books.map((book) => (
              <Col span={6}>
                <Card
                  hoverable
                  style={{ width: 280, marginBottom: 15 }}
                  cover={
                    <img
                      alt="example"
                      src={book.volumeInfo.imageLinks.thumbnail}
                    />
                  }
                >
                  <Text strong>{book.volumeInfo.title}</Text>
                  <Paragraph>{trimText(book.volumeInfo.description)}</Paragraph>
                  <Link to={`/book/${book.id}`}>
                    <Button type="primary" icon={<BookOutlined />}>
                      View
                    </Button>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </BookDiv>
    </Layout>
  );
};

export default BookList;

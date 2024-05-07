// Cart.js
import React from "react";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Col, Card } from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  InfoCircleFilled,
} from "@ant-design/icons";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Header } = Layout;
const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div>
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
      <Layout style={{ padding: 50 }}>
        <h1>Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <Col>
            {cart.map((book) => (
              <Card key={book.id} style={{ padding: 10, margin: 10 }}>
                <h2>{book.title}</h2>
                <p>Author: {book.authors?.join(", ")}</p>
                <p>Publisher: {book.publisher}</p>
                <p>Published Date: {book.publishedDate}</p>
                <Button
                  type="primary"
                  danger
                  onClick={() => removeFromCart(book.id)}
                >
                  Remove from Cart
                </Button>
              </Card>
            ))}
          </Col>
        )}
      </Layout>
    </div>
  );
};

export default Cart;

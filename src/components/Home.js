import React, { useEffect, useState } from "react";
import { HeroElement } from "../styled/Hero";
import { ListSection } from "../styled/ListSection";
import Book from "./Book";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Layout, Menu, Button } from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  InfoCircleFilled,
} from "@ant-design/icons";
import { ShoppingCartOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { Space, Typography } from "antd";
import Paragraph from "antd/es/skeleton/Paragraph";

const { Text } = Typography;

const { Header } = Layout;

const Home = () => {
  const { cart } = useCart();
  const [categories, setSetCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [books, setBooks] = useState([]);

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
      <Layout
        style={{
          backgroundImage: `url("https://www.pexels.com/photo/library-interior-877971/") cover cover`,
          padding: "50px",
        }}
      >
        <SearchBar />
        <HeroElement>
          <Title style={{ fontSize: "40px" }}>
            This is the sensational feel
          </Title>
          <Title type="secondary" level={3}>
            Lead your path in reading{" "}
          </Title>
          <Button type="primary" icon={<UsergroupAddOutlined />}>
            Join Us
          </Button>
        </HeroElement>
        <ListSection style={{ marginTop: "30px", marginBottom: "20px" }}>
          <Title style={{ marginTop: "100px" }}>Featured Books</Title>
          <Text type="secondary" style={{ marginBottom: "40px" }}>
            Featured Books from the selected category
          </Text>
          <Book />
        </ListSection>
      </Layout>
    </div>
  );
};

export default Home;

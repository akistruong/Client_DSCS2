import React from "react";
import HeaderMainHome from "~/components/layout/DefaultLayout/Header";
import FooterMainHome from "~/components/layout/DefaultLayout/Footer";
import { Layout } from "antd";
const { Header, Content, Sider, Footer } = Layout;
const DefaultLayout = ({ children }) => {
  return (
    <Layout>
      <Header
        style={{ backgroundColor: "white", padding: "1rem", height: "100%" }}
      >
        <HeaderMainHome />
      </Header>
      <Content>{children}</Content>
      <Footer style={{ backgroundColor: "red", padding: "5rem" }}>
        <FooterMainHome />
      </Footer>
    </Layout>
  );
};

export default DefaultLayout;

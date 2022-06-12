import React from "react";
import Header from "~/components/layout/DefaultLayout/Header";
import Panel from "~/components/layout/DefaultLayout/Panel";
import Footer from "~/components/layout/DefaultLayout/Footer";
const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Panel />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default DefaultLayout;

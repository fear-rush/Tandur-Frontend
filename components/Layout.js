import React, { Fragment } from "react";
import Head from "next/head";

import { useRouter } from "next/router";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Tandur</title>
        <meta
          name="description"
          content="User Dashboard for Smart Water Irrigation System"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col justify-between  ">
        <Navbar></Navbar>

        <main className="container m-auto mt-4 mb-4 max-w-screen-xl px-4">
          {children}
        </main>
        <div className="footer w-full mt-16 bg-green-500">
          <Footer></Footer>
        </div>
      </div>
    </>
  );
};

export default Layout;

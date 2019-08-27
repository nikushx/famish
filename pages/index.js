import React from "react";
import Link from "next/link";
import Head from "next/head";
import Nav from "../components/nav";
import App from "../components/App";

const Home = () => (
  <div>
	<style dangerouslySetInnerHTML={{__html: `
      body { margin: 0 }
    `}} />
    <Head>
      <title>Famish - WIP</title>
    </Head>

    <App />
  </div>
);

export default Home;

import React, { useEffect, useContext, useState } from "react";
import Layout from "../components/Layout";
import BookPost from "../components/BookPost";

export default function BookPage() {
  return (
    <Layout>
      <BookPost />
    </Layout>
  );
}

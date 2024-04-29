import React, { useEffect, useContext, useState } from "react";
import Layout from "../components/Layout";
import BigBoard from "../components/BigBoard";

export default function BoardPage() {
  return (
    <Layout>
      <BigBoard />
    </Layout>
  );
}

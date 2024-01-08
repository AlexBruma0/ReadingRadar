import React, { useEffect, useContext, useState } from "react";
import Layout from "../components/Layout";
import KanbanBoard from "../components/KanbanBoard";

export default function HomePage() {
  return (
    <Layout>
      <div className="font-bold my-4 text-3xl">Library</div>
      <KanbanBoard />
    </Layout>
  );
}

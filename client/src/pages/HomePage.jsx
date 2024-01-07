import React, { useEffect, useContext, useState } from "react";
import Layout from "../components/Layout";
import KanbanBoard from "../components/KanbanBoard";

export default function HomePage() {
  return (
    <Layout>
       <KanbanBoard /> 
     </Layout> 
  );
}

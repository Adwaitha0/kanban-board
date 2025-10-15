"use client";
import { useState } from "react";
import Header from "../../../components/Header";
import MainContent from "../../../components/MainContent";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
   const [selectedTag, setSelectedTag] = useState("");
  return (

    <div className="font-sans flex flex-col bg-[#424242] items-center justify-items-center min-h-screen sm:p-7"> 
      {/* <Header /> */}
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedTag={selectedTag} setSelectedTag={setSelectedTag} />

      <MainContent searchTerm={searchTerm}  selectedTag={selectedTag} />
    </div>
  );
}

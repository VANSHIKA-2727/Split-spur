import React, { useState } from "react";
import SetupPage from "./SetupPage";
import EditorPage from "./EditorPage";

export default function Splitspurpage() {
  const [currentPage, setCurrentPage] = useState("setup");

  const [testData, setTestData] = useState({
    name: "",
    url: "",
    duration: "14 Days",
  });

  const handleInputChange = (field, value) => {
    setTestData((prev) => ({ ...prev, [field]: value }));
  };

  return currentPage === "setup" ? (
    <SetupPage
      testData={testData}
      handleInputChange={handleInputChange}
      setCurrentPage={setCurrentPage}
    />
  ) : (
    <EditorPage
      testData={testData}
      handleInputChange={handleInputChange}
      setCurrentPage={setCurrentPage}
    />
  );
}

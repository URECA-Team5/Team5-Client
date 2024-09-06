import React, { useRef } from "react";
import "./MainContent.css";
import SearchBar from "./SearchBar";
import background from "../images/backgroundImg.jpg";

const MainContent = () => {
  const fileInputRef = useRef(null);

  // 버튼 클릭 시 파일 선택 다이얼로그를 열기 위한 함수
  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className="main-content"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="search-container">
        <SearchBar />
      </div>
      <div className="button-container">
        <button className="custom-button" onClick={handleFileSelect}>
          약품 이미지로 검색하기
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      </div>
      <div className="content-container">
        <h1>내 손 안의 약사 서비스, HANDICINE</h1>
        <p>
          5000 종 이상의 의약품, <br />
          식품의약품안전처에서 제공한 정보로 안전하게!
        </p>
      </div>
    </div>
  );
};

export default MainContent;

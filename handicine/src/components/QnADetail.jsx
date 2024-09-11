import React, { useState, useEffect } from 'react';
import './QnAPage.css';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownButton, FormControl, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // 돋보기 아이콘

const QnADetail = () => {
 

  const [searchOption, setSearchOption] = useState("제목만");
  const [searchText, setSearchText] = useState("");

  const handleSearchOptionSelect = (option) => {
    setSearchOption(option);
  };

  const handleSearch = () => {
    console.log(`검색 옵션: ${searchOption}, 검색어: ${searchText}`);
    // 검색 기능을 추가할 때 사용할 검색 로직
  };

  useEffect(() => {
    // 백엔드 API에서 데이터를 가져오는 로직을 추가할 수 있습니다.
  }, []);

  return (
    <div className="qna-page">
      <h1>전문가 Q&A 게시판</h1>

      <div className="search-bar">
        <InputGroup className="custom-search">
          <FormControl
            placeholder="검색어를 입력해주세요"
            aria-label="Search"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <InputGroup.Text className="search-icon" onClick={handleSearch}>
            <FaSearch style={{ color: 'green' }} />
          </InputGroup.Text>
        </InputGroup>
      </div>
    </div>
  );
};

export default QnADetail;
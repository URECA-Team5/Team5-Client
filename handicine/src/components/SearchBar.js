import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <Form className="search-bar">
      <FormControl
        type="text"
        placeholder="약품 이름을 입력해주세요"
        className="search-input"
      />
      <Button variant="success" className="search-button">
        <i className="fas fa-search"></i>
      </Button>
    </Form>
  );
};

export default SearchBar;
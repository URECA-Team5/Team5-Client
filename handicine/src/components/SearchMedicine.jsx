import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Form, Modal, Button, ListGroup } from 'react-bootstrap';
import './searchMedicine.css'; 
import TylenolImage from '../images/Tylenol.jpg';
import TylenolImage2 from '../images/Tylenol2.jpg';
import TylenolImage3 from '../images/Tylenol3.jpg';

// 약품 데이터 예시
const medicineData = [
  { 
    name: '타이레놀', 
    image: TylenolImage, 
    description: '통증 완화 및 해열에 사용되는 약품.', 
    manufacturer: '제조사 A',
    usage: '사용법 설명',
    warning: '주의사항 설명',
    interaction: '상호작용 설명',
    sideEffects: '부작용 설명',
    storage: '보관법 설명'
  },
  { 
    name: '타이레놀2', 
    image: TylenolImage2, 
    description: '염증 완화 및 통증 완화에 사용되는 약품.',
    manufacturer: '제조사 B',
    usage: '사용법 설명2',
    warning: '주의사항 설명2',
    interaction: '상호작용 설명2',
    sideEffects: '부작용 설명2',
    storage: '보관법 설명2'
  },
  { 
    name: '타이레놀3', 
    image: TylenolImage3, 
    description: '알러지 증상 완화에 사용되는 약품.',
    manufacturer: '제조사 C',
    usage: '사용법 설명3',
    warning: '주의사항 설명3',
    interaction: '상호작용 설명3',
    sideEffects: '부작용 설명3',
    storage: '보관법 설명3'
  }
];

const SearchMedicine = () => {
  const { medicineName } = useParams(); 
  const [searchTerm, setSearchTerm] = useState(medicineName || '');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeSection, setActiveSection] = useState('description'); // 현재 선택된 항목
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/searchMedicine/${searchTerm}`);
    }
  };

  // 검색어에 따라 필터링된 약품 목록 생성
  const filteredMedicines = medicineData.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (medicine) => {
    setSelectedMedicine(medicine);
    setShowModal(true);
    setActiveSection('description'); // 기본으로 description 섹션 선택
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMedicine(null);
  };

  return (
    <div className="search-medicine-page">
      <div className="search-bar-container">
        <Form onSubmit={handleSearchSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="약품 이름을 입력하세요"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                padding: "10px",
                fontSize: "1.2rem",
                borderRadius: "0.25rem",
                borderColor: "green",
                width: "300px",
              }}
            />
          </Form.Group>
        </Form>
      </div>
      <Container>
        {/* 검색어가 있을 때만 카드 표시 */}
        {searchTerm.trim() && (
          <Row className="card-container">
            {filteredMedicines.length > 0 ? (
              filteredMedicines.map((medicine, index) => (
                <Col md={4} key={index} className="card-col">
                  <Card className="card" onClick={() => handleCardClick(medicine)}>
                    <Card.Img variant="top" src={medicine.image} className="card-img" alt={medicine.name} />
                    <Card.Body>
                      <Card.Title className="card-title">{medicine.name}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p style={{color:"#333"}}>해당 약품이 없습니다.</p>
            )}
          </Row>
        )}
      </Container>

      {/* MedicineDetail 모달 */}
      {selectedMedicine && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedMedicine.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                {/* 왼쪽 메뉴바 */}
                <Col md={3}>
                  <ListGroup>
                    <ListGroup.Item action onClick={() => setActiveSection('description')}>
                      제품 설명
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={() => setActiveSection('manufacturer')}>
                      제조사
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={() => setActiveSection('usage')}>
                      사용법
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={() => setActiveSection('warning')}>
                      주의사항
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={() => setActiveSection('interaction')}>
                      상호작용
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={() => setActiveSection('sideEffects')}>
                      부작용
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={() => setActiveSection('storage')}>
                      보관법
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

                {/* 오른쪽 상세 내용 */}
                <Col md={9}>
                  {activeSection === 'description' && <p className="medicine-text">{selectedMedicine.description}</p>}
                  {activeSection === 'manufacturer' && <p className="medicine-text">{selectedMedicine.manufacturer}</p>}
                  {activeSection === 'usage' && <p className="medicine-text">{selectedMedicine.usage}</p>}
                  {activeSection === 'warning' && <p className="medicine-text">{selectedMedicine.warning}</p>}
                  {activeSection === 'interaction' && <p className="medicine-text">{selectedMedicine.interaction}</p>}
                  {activeSection === 'sideEffects' && <p className="medicine-text">{selectedMedicine.sideEffects}</p>}
                  {activeSection === 'storage' && <p className="medicine-text">{selectedMedicine.storage}</p>}
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default SearchMedicine;

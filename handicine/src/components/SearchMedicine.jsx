import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Form, Modal, Button, ListGroup } from 'react-bootstrap';
import './searchMedicine.css';
import TylenolImage from '../images/Tylenol.jpg';
import TylenolImage2 from '../images/Tylenol2.jpg';
import TylenolImage3 from '../images/Tylenol3.jpg';

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
  },
  { 
    name: '타이레놀4', 
    image: TylenolImage, 
    description: '기타 설명.',
    manufacturer: '제조사 D',
    usage: '사용법 설명4',
    warning: '주의사항 설명4',
    interaction: '상호작용 설명4',
    sideEffects: '부작용 설명4',
    storage: '보관법 설명4'
  },
  { 
    name: '타이레놀5', 
    image: TylenolImage3, 
    description: '알러지 증상 완화에 사용되는 약품.',
    manufacturer: '제조사 C',
    usage: '사용법 설명3',
    warning: '주의사항 설명3',
    interaction: '상호작용 설명3',
    sideEffects: '부작용 설명3',
    storage: '보관법 설명3'
  },
  { 
    name: '타이레놀6', 
    image: TylenolImage3, 
    description: '알러지 증상 완화에 사용되는 약품.',
    manufacturer: '제조사 C',
    usage: '사용법 설명3',
    warning: '주의사항 설명3',
    interaction: '상호작용 설명3',
    sideEffects: '부작용 설명3',
    storage: '보관법 설명3'
  },
  { 
    name: '타이레놀7', 
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
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeSection, setActiveSection] = useState('description');
  const navigate = useNavigate();

  useEffect(() => {
    // Update the search term and filteredMedicines when medicineName URL param changes
    if (medicineName) {
      setSearchTerm(medicineName);
      const results = medicineData.filter(medicine =>
        medicine.name.toLowerCase().includes(medicineName.toLowerCase())
      );
      setFilteredMedicines(results);
    }
  }, [medicineName]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      const results = medicineData.filter(medicine =>
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMedicines(results);
      navigate(`/searchMedicine/${searchTerm}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit(e);
    }
  };

  const handleCardClick = (medicine) => {
    setSelectedMedicine(medicine);
    setShowModal(true);
    setActiveSection('description');
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
              onKeyDown={handleKeyDown}
            />
          </Form.Group>
        </Form>
      </div>
      <Container>
        {filteredMedicines.length > 0 && (
          <Row className="card-container">
            {filteredMedicines.map((medicine, index) => (
              <Col md={4} key={index} className="card-col">
                <Card className="card" onClick={() => handleCardClick(medicine)}>
                  <Card.Img variant="top" src={medicine.image} className="card-img" alt={medicine.name} />
                  <Card.Body>
                    <Card.Title className="card-title">{medicine.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        {filteredMedicines.length === 0 && searchTerm.trim() !== '' && (
          <p style={{ color: "#333", marginTop:"500px", fontSize:"2rem" }}>해당 약품은 존재하지 않습니다.</p>
        )}
      </Container>

      {selectedMedicine && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedMedicine.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
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
                <Col md={9}>
                  {activeSection === 'description' && <p>{selectedMedicine.description}</p>}
                  {activeSection === 'manufacturer' && <p>{selectedMedicine.manufacturer}</p>}
                  {activeSection === 'usage' && <p>{selectedMedicine.usage}</p>}
                  {activeSection === 'warning' && <p>{selectedMedicine.warning}</p>}
                  {activeSection === 'interaction' && <p>{selectedMedicine.interaction}</p>}
                  {activeSection === 'sideEffects' && <p>{selectedMedicine.sideEffects}</p>}
                  {activeSection === 'storage' && <p>{selectedMedicine.storage}</p>}
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default SearchMedicine;

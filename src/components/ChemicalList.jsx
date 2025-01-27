import React from 'react';
import { Row, Col, Alert, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ChemicalCard from './ChemicalCard';

const ChemicalList = ({ chemicals }) => {
  if (!chemicals.length) {
    return (
      <Card className="text-center py-5">
        <Card.Body>
          <FontAwesomeIcon 
            icon={faSearch} 
            size="3x" 
            className="text-muted mb-3"
          />
          <h4>No Chemicals Found</h4>
          <p className="text-muted">
            Try adjusting your search criteria or filters to find what you're looking for.
          </p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {chemicals.map((chemical, index) => (
        <Col key={chemical['CAS Number'] + index}>
          <ChemicalCard chemical={chemical} />
        </Col>
      ))}
    </Row>
  );
};

export default ChemicalList; 
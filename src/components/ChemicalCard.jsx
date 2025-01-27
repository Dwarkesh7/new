import React from 'react';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapMarkerAlt, faFlask, faShieldAlt, faCertificate } from '@fortawesome/free-solid-svg-icons';

const ChemicalCard = ({ chemical }) => {
  const bestVendor = chemical.vendors.reduce((best, current) => 
    current.customerRating > best.customerRating ? current : best
  );

  const getHazardColor = (hazard) => {
    switch (hazard.toLowerCase()) {
      case 'non-hazardous':
        return 'success';
      case 'flammable':
        return 'warning';
      case 'toxic':
      case 'corrosive':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="h-100 chemical-card">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-start">
          <div>
            {chemical['Chemical Name']}
            <div className="small text-muted">{chemical['Chemical Formula']}</div>
          </div>
          <Badge 
            bg={getHazardColor(chemical['Hazard Classification'])}
            className="ms-2"
          >
            {chemical['Hazard Classification']}
          </Badge>
        </Card.Title>

        <div className="mb-3">
          <Badge bg="info" className="me-2">
            <FontAwesomeIcon icon={faFlask} className="me-1" />
            {chemical['Grade/Type']}
          </Badge>
          <Badge bg="secondary">
            CAS: {chemical['CAS Number']}
          </Badge>
        </div>

        <Row className="mb-3 g-2">
          <Col xs={6}>
            <div className="small text-muted">Purity</div>
            <strong>{chemical['Purity']}</strong>
          </Col>
          <Col xs={6}>
            <div className="small text-muted">Best Price</div>
            <strong>₹{bestVendor.price}/kg</strong>
          </Col>
        </Row>

        <div className="mb-3">
          <div className="small text-muted mb-1">
            <FontAwesomeIcon icon={faCertificate} className="me-1" />
            Certifications
          </div>
          <div>
            {bestVendor.certifications.map((cert, index) => (
              <Badge 
                key={index} 
                bg="light" 
                text="dark" 
                className="me-1 mb-1"
              >
                {cert}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <div className="small text-muted">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" />
            Best Vendor
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <strong>{bestVendor.name}</strong>
            <div>
              <FontAwesomeIcon icon={faStar} className="text-warning me-1" />
              {bestVendor.customerRating}
            </div>
          </div>
          <div className="small">
            {bestVendor.stockAvailability}
            <span className="mx-2">•</span>
            Lead Time: {bestVendor.leadTime} days
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <FontAwesomeIcon icon={faShieldAlt} className="text-success me-1" />
            <span className="small">
              Sustainability: {bestVendor.sustainabilityScore}%
            </span>
          </div>
          <Link 
            to={`/chemical/${chemical['CAS Number']}`} 
            className="text-decoration-none"
          >
            <Button variant="primary" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ChemicalCard; 
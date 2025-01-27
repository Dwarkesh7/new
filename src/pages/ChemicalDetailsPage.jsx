import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapMarkerAlt, faThermometer, faFlask } from '@fortawesome/free-solid-svg-icons';
import WeatherWidget from '../components/WeatherWidget';

const ChemicalDetailsPage = () => {
  const { id } = useParams();
  const [chemical, setChemical] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch chemical details from Excel data
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <Container className="py-4">
        <div>Loading...</div>
      </Container>
    );
  }

  // Temporary mock data
  const mockChemical = {
    id,
    name: 'Sample Chemical',
    formula: 'H2O',
    casNumber: '7732-18-5',
    grade: 'Analytical',
    purity: '99.9%',
    molecularWeight: '18.02 g/mol',
    meltingPoint: '0°C',
    boilingPoint: '100°C',
    density: '1 g/cm³',
    solubility: 'Miscible',
    appearance: 'Colorless liquid',
    hazardClass: 'Non-hazardous',
    vendor: {
      name: 'Sample Vendor',
      location: 'Mumbai, India',
      rating: 4.5,
      reviews: 128,
      price: 1000,
      inStock: true,
      leadTime: '3-5 days',
      certifications: ['ISO 9001', 'GMP'],
      sustainability: 85
    }
  };

  return (
    <Container className="py-4">
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <h2>{mockChemical.name}</h2>
              <h4 className="text-muted">{mockChemical.formula}</h4>
              
              <div className="mb-3">
                <Badge bg="info" className="me-2">CAS: {mockChemical.casNumber}</Badge>
                <Badge bg="secondary">Grade: {mockChemical.grade}</Badge>
              </div>

              <Table striped bordered>
                <tbody>
                  <tr>
                    <td><FontAwesomeIcon icon={faFlask} className="me-2" />Purity</td>
                    <td>{mockChemical.purity}</td>
                  </tr>
                  <tr>
                    <td>Molecular Weight</td>
                    <td>{mockChemical.molecularWeight}</td>
                  </tr>
                  <tr>
                    <td><FontAwesomeIcon icon={faThermometer} className="me-2" />Melting Point</td>
                    <td>{mockChemical.meltingPoint}</td>
                  </tr>
                  <tr>
                    <td><FontAwesomeIcon icon={faThermometer} className="me-2" />Boiling Point</td>
                    <td>{mockChemical.boilingPoint}</td>
                  </tr>
                  <tr>
                    <td>Density</td>
                    <td>{mockChemical.density}</td>
                  </tr>
                  <tr>
                    <td>Solubility</td>
                    <td>{mockChemical.solubility}</td>
                  </tr>
                  <tr>
                    <td>Appearance</td>
                    <td>{mockChemical.appearance}</td>
                  </tr>
                  <tr>
                    <td>Hazard Classification</td>
                    <td>{mockChemical.hazardClass}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <h4>Vendor Information</h4>
              <p>
                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                {mockChemical.vendor.location}
              </p>
              
              <div className="mb-3">
                <h5>₹{mockChemical.vendor.price}/kg</h5>
                {mockChemical.vendor.inStock ? (
                  <Badge bg="success">In Stock</Badge>
                ) : (
                  <Badge bg="warning" text="dark">Out of Stock</Badge>
                )}
              </div>

              <div className="mb-3">
                <FontAwesomeIcon icon={faStar} className="text-warning me-1" />
                {mockChemical.vendor.rating} ({mockChemical.vendor.reviews} reviews)
              </div>

              <div className="mb-3">
                <p className="mb-1">Lead Time: {mockChemical.vendor.leadTime}</p>
                <p className="mb-1">Sustainability Score: {mockChemical.vendor.sustainability}%</p>
                <div>
                  Certifications:
                  {mockChemical.vendor.certifications.map((cert) => (
                    <Badge key={cert} bg="info" className="ms-1">{cert}</Badge>
                  ))}
                </div>
              </div>

              <Button variant="primary" className="w-100">
                Contact Vendor
              </Button>
            </Card.Body>
          </Card>

          <WeatherWidget />
        </Col>
      </Row>
    </Container>
  );
};

export default ChemicalDetailsPage; 
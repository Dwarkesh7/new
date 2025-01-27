import React, { useState } from 'react';
import { Container, Row, Col, Card, Tab, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import ChemicalList from '../components/ChemicalList';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('saved');

  // Mock data for saved items
  const savedChemicals = [];
  const savedVendors = [];
  const recentSearches = [];

  return (
    <Container className="py-4">
      <Row>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <div className="text-center mb-3">
                <img
                  src={currentUser?.photoURL || 'https://via.placeholder.com/100'}
                  alt="Profile"
                  className="rounded-circle mb-2"
                  style={{ width: '100px', height: '100px' }}
                />
                <h5>{currentUser?.email}</h5>
              </div>
              <Button variant="outline-primary" className="w-100 mb-2">
                Edit Profile
              </Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h6 className="mb-3">Account Statistics</h6>
              <div className="d-flex justify-content-between mb-2">
                <span>Saved Chemicals</span>
                <span>{savedChemicals.length}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Saved Vendors</span>
                <span>{savedVendors.length}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Recent Searches</span>
                <span>{recentSearches.length}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          <Card>
            <Card.Body>
              <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                <Nav variant="tabs" className="mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="saved">Saved Chemicals</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="vendors">Saved Vendors</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="recent">Recent Searches</Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="saved">
                    <ChemicalList chemicals={savedChemicals} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="vendors">
                    {savedVendors.length === 0 ? (
                      <p className="text-muted">No saved vendors yet.</p>
                    ) : (
                      <Row xs={1} md={2} className="g-4">
                        {savedVendors.map((vendor) => (
                          <Col key={vendor.id}>
                            {/* TODO: Create VendorCard component */}
                            <Card>
                              <Card.Body>
                                <Card.Title>{vendor.name}</Card.Title>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="recent">
                    {recentSearches.length === 0 ? (
                      <p className="text-muted">No recent searches.</p>
                    ) : (
                      <ul className="list-unstyled">
                        {recentSearches.map((search) => (
                          <li key={search.id} className="mb-2">
                            <Button variant="link" className="text-decoration-none p-0">
                              {search.query}
                            </Button>
                            <small className="text-muted ms-2">
                              {new Date(search.timestamp).toLocaleDateString()}
                            </small>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage; 
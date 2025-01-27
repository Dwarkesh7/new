import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import FilterSection from '../components/FilterSection';
import ChemicalList from '../components/ChemicalList';
import WeatherWidget from '../components/WeatherWidget';
import { searchChemicals } from '../services/dataService';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    location: '',
    priceRange: [0, 1000000],
    availability: false,
  });

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchChemicals(query, filters);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (newFilters) => {
    setFilters(newFilters);
    setLoading(true);
    setError(null);
    try {
      const results = await searchChemicals('', newFilters);
      setSearchResults(results);
    } catch (error) {
      console.error('Filter error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch('');
  }, []);

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="text-center mb-5">
            <h1 className="display-4 mb-3">Welcome to ChemFinder</h1>
            <p className="lead text-muted">
              Search through our extensive database of chemicals and find the right vendor for your needs
            </p>
          </div>
          <div className="search-bar-container">
            <SearchBar onSearch={handleSearch} />
          </div>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              <Alert.Heading>Error</Alert.Heading>
              <p className="mb-0">{error}</p>
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col md={3}>
          <div className="sticky-sidebar">
            <FilterSection 
              filters={filters} 
              onFilterChange={handleFilterChange}
              disabled={loading}
            />
            <div className="mt-4">
              <WeatherWidget />
            </div>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <ChemicalList chemicals={searchResults} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage; 
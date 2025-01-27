import React from 'react';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faIndustry, faMoneyBill, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

const FilterSection = ({ filters, onFilterChange, disabled }) => {
  const handleLocationChange = (e) => {
    onFilterChange({ ...filters, location: e.target.value });
  };

  const handlePriceRangeChange = (e, index) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = parseInt(e.target.value) || 0;
    onFilterChange({ ...filters, priceRange: newPriceRange });
  };

  const handleAvailabilityChange = (e) => {
    onFilterChange({ ...filters, availability: e.target.checked });
  };

  const handleReset = () => {
    onFilterChange({
      location: '',
      priceRange: [0, 1000000],
      availability: false,
    });
  };

  return (
    <Card className="filter-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Card.Title className="mb-0">
            <FontAwesomeIcon icon={faFilter} className="me-2" />
            Filters
          </Card.Title>
          <Button 
            variant="outline-secondary" 
            size="sm"
            onClick={handleReset}
            disabled={disabled}
          >
            Reset
          </Button>
        </div>

        <Form>
          <Form.Group className="mb-4">
            <Form.Label>
              <FontAwesomeIcon icon={faIndustry} className="me-2" />
              Vendor Location
            </Form.Label>
            <Form.Select
              value={filters.location}
              onChange={handleLocationChange}
              className="border-0 shadow-sm"
              disabled={disabled}
            >
              <option value="">All Locations</option>
              <option value="Vendor A">Vendor A</option>
              <option value="Vendor B">Vendor B</option>
              <option value="Vendor C">Vendor C</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>
              <FontAwesomeIcon icon={faMoneyBill} className="me-2" />
              Price Range (₹)
            </Form.Label>
            <div className="d-flex gap-2">
              <InputGroup>
                <Form.Control
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(e, 0)}
                  min="0"
                  className="border-0 shadow-sm"
                  disabled={disabled}
                />
              </InputGroup>
              <InputGroup>
                <Form.Control
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(e, 1)}
                  min="0"
                  className="border-0 shadow-sm"
                  disabled={disabled}
                />
              </InputGroup>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faBoxOpen} className="me-2 text-muted" />
              <Form.Check
                type="switch"
                id="availability-switch"
                label="Show Only In Stock"
                checked={filters.availability}
                onChange={handleAvailabilityChange}
                disabled={disabled}
              />
            </div>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FilterSection; 
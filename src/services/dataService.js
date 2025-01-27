import * as XLSX from 'xlsx';
import csvData from '../components/dataset/Large_Chemical_Dataset.csv';

let cachedData = null;

export const loadChemicalData = async () => {
  if (cachedData) return cachedData;

  try {
    const response = await fetch(csvData);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const text = await response.text();
    if (!text) {
      throw new Error('Empty dataset received');
    }

    const rows = text.split('\n').map(row => row.split(','));
    if (rows.length < 2) {
      throw new Error('Invalid dataset format: insufficient rows');
    }

    const headers = rows[0];
    const data = rows.slice(1)
      .filter(row => row.length === headers.length) // Skip malformed rows
      .map(row => {
        const item = {};
        headers.forEach((header, index) => {
          item[header.trim()] = row[index]?.trim() || '';
        });
        return item;
      });

    // Validate required fields
    const requiredFields = [
      'Chemical Name',
      'Chemical Formula',
      'CAS Number',
      'Vendor Name',
      'Price per kg (₹)',
      'Stock Availability'
    ];

    data.forEach((item, index) => {
      requiredFields.forEach(field => {
        if (!item[field]) {
          console.warn(`Missing ${field} in row ${index + 2}`);
        }
      });
    });

    // Group by chemical name
    const groupedData = data.reduce((acc, item) => {
      if (!acc[item['Chemical Name']]) {
        acc[item['Chemical Name']] = {
          ...item,
          vendors: []
        };
      }
      acc[item['Chemical Name']].vendors.push({
        name: item['Vendor Name'],
        price: parseFloat(item['Price per kg (₹)']) || 0,
        leadTime: parseInt(item['Lead Time (days)']) || 0,
        stockAvailability: item['Stock Availability'],
        certifications: (item['Certifications'] || '').split(',').map(cert => cert.trim()),
        sustainabilityScore: parseInt(item['Sustainability Score']) || 0,
        customerRating: parseFloat(item['Customer Rating']) || 0
      });
      return acc;
    }, {});

    cachedData = Object.values(groupedData);
    return cachedData;
  } catch (error) {
    console.error('Error loading chemical data:', error);
    throw new Error('Failed to load chemical data. Please try again later.');
  }
};

export const searchChemicals = async (query, filters = {}) => {
  try {
    const data = await loadChemicalData();
    
    // Normalize query
    const normalizedQuery = query.toLowerCase().trim();
    
    return data.filter(chemical => {
      // Search matching
      const matchesQuery = !normalizedQuery || 
        chemical['Chemical Name'].toLowerCase().includes(normalizedQuery) ||
        chemical['Chemical Formula'].toLowerCase().includes(normalizedQuery) ||
        chemical['CAS Number'].includes(normalizedQuery);

      // Filter matching
      const matchesLocation = !filters.location || 
        chemical.vendors.some(vendor => 
          vendor.name.toLowerCase().includes(filters.location.toLowerCase())
        );

      const matchesPrice = !filters.priceRange || 
        chemical.vendors.some(vendor => 
          vendor.price >= filters.priceRange[0] && 
          vendor.price <= filters.priceRange[1]
        );

      const matchesAvailability = !filters.availability || 
        chemical.vendors.some(vendor => 
          vendor.stockAvailability.toLowerCase().includes('in stock')
        );

      return matchesQuery && matchesLocation && matchesPrice && matchesAvailability;
    });
  } catch (error) {
    console.error('Search error:', error);
    throw new Error('Failed to search chemicals. Please try again later.');
  }
}; 
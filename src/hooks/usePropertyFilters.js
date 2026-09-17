import { useState, useMemo } from 'react';

export function usePropertyFilters(initialProperties) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('All Neighborhoods');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('All Prices');
  const [selectedHouseSize, setSelectedHouseSize] = useState('All Sizes');

  const filteredProperties = useMemo(() => {
    return initialProperties.filter(property => {
      // Search term filter (case-insensitive match in title, neighborhood, or description)
      const searchMatch = searchTerm 
        ? property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.description.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      // Neighborhood filter (exact match, unless "All Neighborhoods")
      const neighborhoodMatch = selectedNeighborhood === 'All Neighborhoods' ||
        property.neighborhood === selectedNeighborhood;

      // Max price filter (property.rentPrice <= selectedMaxPrice, unless "All Prices")
      const priceMatch = selectedMaxPrice === 'All Prices' ||
        property.rentPrice <= parseInt(selectedMaxPrice.replace(/[^0-9]/g, ''), 10);

      // House size filter (exact match, unless "All Sizes")
      const sizeMatch = selectedHouseSize === 'All Sizes' ||
        property.houseSize === selectedHouseSize;

      return searchMatch && neighborhoodMatch && priceMatch && sizeMatch;
    });
  }, [initialProperties, searchTerm, selectedNeighborhood, selectedMaxPrice, selectedHouseSize]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedNeighborhood('All Neighborhoods');
    setSelectedMaxPrice('All Prices');
    setSelectedHouseSize('All Sizes');
  };

  return {
    filteredProperties,
    searchTerm,
    selectedNeighborhood,
    selectedMaxPrice,
    selectedHouseSize,
    onSearchChange: setSearchTerm,
    onNeighborhoodChange: setSelectedNeighborhood,
    onMaxPriceChange: setSelectedMaxPrice,
    onHouseSizeChange: setSelectedHouseSize,
    resetFilters
  };
}

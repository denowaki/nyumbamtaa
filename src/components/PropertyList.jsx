function PropertyList({
  onSearchChange,
  onNeighborhoodChange,
  onMaxPriceChange,
  onHouseSizeChange,
  searchTerm,
  selectedNeighborhood,
  selectedMaxPrice,
  selectedHouseSize,
  totalProperties = 0,
}) {
  return (
    <section aria-label="Property listings">
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="property-search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              id="property-search"
              type="text"
              placeholder="Search by title, neighborhood, or description"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="neighborhood-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Neighborhood
            </label>
            <select
              id="neighborhood-filter"
              value={selectedNeighborhood}
              onChange={(e) => onNeighborhoodChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>All Neighborhoods</option>
              <option>Kilimani</option>
              <option>Westlands</option>
              <option>Roysambu</option>
              <option>Karen</option>
              <option>Lavington</option>
              <option>Kileleshwa</option>
            </select>
          </div>

          <div>
            <label htmlFor="max-price-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Max Price
            </label>
            <select
              id="max-price-filter"
              value={selectedMaxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>All Prices</option>
              <option>KSh 20,000</option>
              <option>KSh 30,000</option>
              <option>KSh 50,000</option>
              <option>KSh 80,000</option>
              <option>KSh 120,000</option>
            </select>
          </div>

          <div>
            <label htmlFor="house-size-filter" className="block text-sm font-medium text-gray-700 mb-1">
              House Size
            </label>
            <select
              id="house-size-filter"
              value={selectedHouseSize}
              onChange={(e) => onHouseSizeChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>All Sizes</option>
              <option>Single Room</option>
              <option>1 Bed</option>
              <option>2 Bed</option>
              <option>3 Bed</option>
            </select>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-4">
        Showing {totalProperties} {totalProperties === 1 ? 'property' : 'properties'}
      </p>
    </section>
  )
}

export default PropertyList

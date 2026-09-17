function PropertyCard({ property, onBookClick, onContactClick }) {
  const { id, title, neighborhood, rentPrice, houseSize, imageUrl } = property

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <span className="absolute top-3 left-3 bg-teal-500 text-white text-sm font-medium px-3 py-1 rounded-full">
          {neighborhood}
        </span>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>

        <div className="flex items-center justify-between">
          <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
            {houseSize}
          </span>
          <p className="text-xl font-bold text-gray-900">KSh {rentPrice}</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => onBookClick(property)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Book House
          </button>
          <button
            type="button"
            onClick={() => onContactClick(property)}
            className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-md transition-colors"
          >
            Contact Agent
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard

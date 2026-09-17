import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function BookingModal({ property, onClose, onSubmitBooking, isUserLoggedIn }) {
  const { user } = useAuth()
  const [message, setMessage] = useState('')
  const [moveInDate, setMoveInDate] = useState('')

  if (!isUserLoggedIn || !user) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmitBooking({
      propertyId: property.id,
      message,
      moveInDate,
      tenantName: user.name,
      tenantPhone: user.phone || '',
    })
    onClose()
    setMessage('')
    setMoveInDate('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Book {property.title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-700">{property.title}</p>
          <p className="text-sm text-gray-500">{property.location}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="booking-message" className="block text-sm font-medium text-gray-700 mb-1">
              Message / Notes to Landlord <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              id="booking-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell the landlord about your interest..."
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="move-in-date" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Move-In Date
            </label>
            <input
              id="move-in-date"
              type="date"
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors"
          >
            Submit Booking Request
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingModal
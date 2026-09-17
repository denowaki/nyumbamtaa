import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function PostHouseForm({ onSubmit }) {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [rentPrice, setRentPrice] = useState('')
  const [houseSize, setHouseSize] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!title.trim()) errs.title = 'Title is required'
    if (!neighborhood) errs.neighborhood = 'Neighborhood is required'
    if (!rentPrice || Number(rentPrice) <= 0) errs.rentPrice = 'Valid rent price is required'
    if (!houseSize) errs.houseSize = 'House size is required'
    if (!description.trim()) errs.description = 'Description is required'
    if (!imageUrl.trim()) errs.imageUrl = 'Image URL is required'
    if (!contactPhone.trim()) errs.contactPhone = 'Contact phone is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const formData = {
      id: Date.now(),
      title,
      neighborhood,
      rentPrice: Number(rentPrice),
      houseSize,
      description,
      imageUrl,
      contactPhone,
      landlord: user?.name || '',
    }
    onSubmit(formData)
    setTitle('')
    setNeighborhood('')
    setRentPrice('')
    setHouseSize('')
    setDescription('')
    setImageUrl('')
    setContactPhone('')
    setErrors({})
  }

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Post a New House</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="ph-title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="ph-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="House title"
            required
            className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="ph-neighborhood" className="block text-sm font-medium text-gray-700 mb-1">
            Neighborhood
          </label>
          <select
            id="ph-neighborhood"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            required
            className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.neighborhood ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select neighborhood</option>
            <option>Kilimani</option>
            <option>Westlands</option>
            <option>Roysambu</option>
            <option>Karen</option>
            <option>Lavington</option>
            <option>Kileleshwa</option>
          </select>
          {errors.neighborhood && <p className="mt-1 text-sm text-red-600">{errors.neighborhood}</p>}
        </div>

        <div>
          <label htmlFor="ph-rentPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Rent Price (KSh)
          </label>
          <input
            id="ph-rentPrice"
            type="number"
            min="0"
            value={rentPrice}
            onChange={(e) => setRentPrice(e.target.value)}
            placeholder="Monthly rent in KSh"
            required
            className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.rentPrice ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.rentPrice && <p className="mt-1 text-sm text-red-600">{errors.rentPrice}</p>}
        </div>

        <div>
          <label htmlFor="ph-houseSize" className="block text-sm font-medium text-gray-700 mb-1">
            House Size
          </label>
          <select
            id="ph-houseSize"
            value={houseSize}
            onChange={(e) => setHouseSize(e.target.value)}
            required
            className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.houseSize ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select size</option>
            <option>Single Room</option>
            <option>1 Bed</option>
            <option>2 Bed</option>
            <option>3 Bed</option>
          </select>
          {errors.houseSize && <p className="mt-1 text-sm text-red-600">{errors.houseSize}</p>}
        </div>

        <div>
          <label htmlFor="ph-description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="ph-description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the house"
            required
            className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="ph-imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            id="ph-imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
            required
            className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.imageUrl && <p className="mt-1 text-sm text-red-600">{errors.imageUrl}</p>}
        </div>

        <div>
          <label htmlFor="ph-contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
            Contact Phone
          </label>
          <input
            id="ph-contactPhone"
            type="tel"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder="07XX XXX XXX"
            required
            className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.contactPhone ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.contactPhone && <p className="mt-1 text-sm text-red-600">{errors.contactPhone}</p>}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Post House
          </button>
          <button
            type="reset"
            onClick={() => {
              setTitle('')
              setNeighborhood('')
              setRentPrice('')
              setHouseSize('')
              setDescription('')
              setImageUrl('')
              setContactPhone('')
              setErrors({})
            }}
            className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-md transition-colors"
          >
            Clear Form
          </button>
        </div>
      </form>
    </section>
  )
}

export default PostHouseForm

import { useState, useCallback } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { usePropertyFilters } from './hooks/usePropertyFilters'
import Navbar from './components/Navbar'
import PropertyCard from './components/PropertyCard'
import PropertyList from './components/PropertyList'
import AuthModal from './components/AuthModal'
import BookingModal from './components/BookingModal'
import PostHouseForm from './components/PostHouseForm'
import { initialProperties } from './data/properties'

function AppContent() {
  const { user, isUserLoggedIn, login, logout } = useAuth()
  const [properties, setProperties] = useState(initialProperties)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isPropertyDetailModalOpen, setIsPropertyDetailModalOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState(null)
  const [toast, setToast] = useState(null)

  const {
    filteredProperties,
    searchTerm,
    selectedNeighborhood,
    selectedMaxPrice,
    selectedHouseSize,
    onSearchChange,
    onNeighborhoodChange,
    onMaxPriceChange,
    onHouseSizeChange,
    resetFilters
  } = usePropertyFilters(properties)

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }, [])

  const handleOpenAuthModal = useCallback(() => {
    setIsAuthModalOpen(true)
  }, [])

  const handleCloseAuthModal = useCallback(() => {
    setIsAuthModalOpen(false)
  }, [])

  const handleLogin = useCallback((role) => {
    const userRole = role || 'tenant'
    login(userRole)
    const capitalized = userRole[0].toUpperCase() + userRole.slice(1)
    showToast(`Welcome back! Logged in as ${capitalized}`)
    if (pendingAction?.type === 'book') {
      setSelectedProperty(pendingAction.property)
      setIsBookingModalOpen(true)
      setPendingAction(null)
    } else if (pendingAction?.type === 'contact') {
      showToast(`Contact ${pendingAction.property.landlord} at ${pendingAction.property.contactPhone}`)
      setPendingAction(null)
    }
  }, [login, showToast, pendingAction])

  const handleLogout = useCallback(() => {
    logout()
    showToast('You have been logged out')
  }, [logout, showToast])

  const handleSignup = useCallback((data) => {
    login(data.role)
    showToast(`Welcome ${data.name}! Signed up as ${data.role}`)
    if (pendingAction?.type === 'book') {
      setSelectedProperty(pendingAction.property)
      setIsBookingModalOpen(true)
      setPendingAction(null)
    } else if (pendingAction?.type === 'contact') {
      showToast(`Contact ${pendingAction.property.landlord} at ${pendingAction.property.contactPhone}`)
      setPendingAction(null)
    }
  }, [login, showToast, pendingAction])

  const handlePropertyBook = useCallback((property) => {
    if (!isUserLoggedIn) {
      setPendingAction({ type: 'book', property })
      setIsAuthModalOpen(true)
      return
    }
    const role = user?.role?.toLowerCase()
    if (role === 'tenant') {
      setSelectedProperty(property)
      setIsPropertyDetailModalOpen(true)
    } else {
      showToast('Only tenants can book properties', 'error')
    }
  }, [isUserLoggedIn, user, showToast])

  const handlePropertyContact = useCallback((property) => {
    if (!isUserLoggedIn) {
      setPendingAction({ type: 'contact', property })
      setIsAuthModalOpen(true)
      return
    }
    showToast(`Contact ${property.landlord} at ${property.contactPhone}`)
  }, [isUserLoggedIn, showToast])

  const handleCardClick = useCallback((property) => {
    setSelectedProperty(property)
    setIsPropertyDetailModalOpen(true)
  }, [])

  const handleClosePropertyDetail = useCallback(() => {
    setIsPropertyDetailModalOpen(false)
    setSelectedProperty(null)
  }, [])

  const handleCloseBookingModal = useCallback(() => {
    setIsBookingModalOpen(false)
  }, [])

  const handleSubmitBooking = useCallback((bookingData) => {
    console.log('Booking submitted:', bookingData)
    showToast('Booking request submitted successfully!')
  }, [showToast])

  const handlePostHouse = useCallback((propertyData) => {
    setProperties(prev => [...prev, propertyData])
    showToast('Property posted successfully!')
  }, [showToast])

  const role = user?.role?.toLowerCase()
  const isLandlordOrAgent = role === 'landlord' || role === 'agent'

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        user={user}
        onLogout={handleLogout}
        onOpenAuthModal={handleOpenAuthModal}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect Home in Nairobi
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover verified rental properties across Nairobi's best neighborhoods.
            {isLandlordOrAgent ? ' Post your listings and connect with tenants.' : ''}
          </p>
        </section>

        {isLandlordOrAgent && (
          <section className="mb-12" aria-labelledby="dashboard-heading">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 id="dashboard-heading" className="text-2xl font-bold text-gray-900 mb-2">
                Landlord Dashboard
              </h2>
              <p className="text-gray-600 mb-4">
                Welcome, {user?.name}! Manage your property listings below.
              </p>
            </div>
            <PostHouseForm onSubmit={handlePostHouse} />
          </section>
        )}

        <section aria-labelledby="listings-heading">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 id="listings-heading" className="text-2xl font-bold text-gray-900">
              Available Properties
            </h2>
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-700 underline self-start"
            >
              Clear Filters
            </button>
          </div>

          <PropertyList
            onSearchChange={onSearchChange}
            onNeighborhoodChange={onNeighborhoodChange}
            onMaxPriceChange={onMaxPriceChange}
            onHouseSizeChange={onHouseSizeChange}
            searchTerm={searchTerm}
            selectedNeighborhood={selectedNeighborhood}
            selectedMaxPrice={selectedMaxPrice}
            selectedHouseSize={selectedHouseSize}
            totalProperties={filteredProperties.length}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div key={property.id} onClick={() => handleCardClick(property)} className="cursor-pointer" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') handleCardClick(property); }}>
                <PropertyCard
                  property={property}
                  onBookClick={handlePropertyBook}
                  onContactClick={handlePropertyContact}
                />
              </div>
            ))}
            {filteredProperties.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">No properties match your filters.</p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-4 text-blue-600 hover:text-blue-700 underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>

        {!isUserLoggedIn && !isLandlordOrAgent && (
          <section className="mt-16 text-center bg-white rounded-lg shadow p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to list your property?
            </h3>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Sign up as a landlord or agent to post your rental listings and reach thousands of potential tenants.
            </p>
            <button
              type="button"
              onClick={handleOpenAuthModal}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-full transition-colors"
            >
              List Your Property
            </button>
          </section>
        )}
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                    aria-hidden="true"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <span className="text-xl font-bold">NyumbaMtaa</span>
              </div>
              <p className="text-gray-400 text-sm">
                Find your perfect home in Nairobi. Verified listings, trusted landlords.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Neighborhoods</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Kilimani</li>
                <li>Westlands</li>
                <li>Karen</li>
                <li>Lavington</li>
                <li>Kileleshwa</li>
                <li>Roysambu</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Safety Guidelines</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: info@nyumbamttaa.co.ke</li>
                <li>Phone: +254 700 000 000</li>
                <li>Nairobi, Kenya</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} NyumbaMtaa. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        onSignup={handleSignup}
        onLogin={handleLogin}
      />

      {selectedProperty && isPropertyDetailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClosePropertyDetail} />
          <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">{selectedProperty.title}</h2>
              <button
                type="button"
                onClick={handleClosePropertyDetail}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none ml-4"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <img
              src={selectedProperty.imageUrl}
              alt={selectedProperty.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <div className="flex items-center gap-3 mb-4">
              <span className="bg-teal-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                {selectedProperty.neighborhood}
              </span>
              <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                {selectedProperty.houseSize}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">{selectedProperty.description}</p>

            <div className="flex items-center justify-between mb-4">
              <p className="text-2xl font-bold text-gray-900">KSh {selectedProperty.rentPrice}/month</p>
              <div className="text-sm text-gray-500">
                <p>Listed by: {selectedProperty.landlord}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsPropertyDetailModalOpen(false)
                  handlePropertyBook(selectedProperty)
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Book House
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsPropertyDetailModalOpen(false)
                  handlePropertyContact(selectedProperty)
                }}
                className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-md transition-colors"
              >
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedProperty && isBookingModalOpen && (
        <BookingModal
          property={selectedProperty}
          onClose={handleCloseBookingModal}
          onSubmitBooking={handleSubmitBooking}
          isUserLoggedIn={isUserLoggedIn && user?.role?.toLowerCase() === 'tenant'}
        />
      )}

      {toast && (
        <div
          className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium transition-all ${
            toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'
          }`}
          role="alert"
        >
          {toast.message}
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

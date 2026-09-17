function Navbar({ user, onLogout, onOpenAuthModal }) {
  const role = user?.role?.toLowerCase()
  const isLandlord = role === 'landlord'

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 py-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full shrink-0">
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
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                NyumbaMtaa
              </h1>
              <p className="text-sm text-gray-500">Find Your Nairobi Home</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span
                  className={
                    isLandlord
                      ? 'bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full'
                      : 'bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full'
                  }
                >
                  {isLandlord ? 'Landlord' : 'Tenant'}
                </span>
                <button
                  type="button"
                  onClick={onLogout}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-5 py-2 rounded-full transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onOpenAuthModal}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-full transition-colors"
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar

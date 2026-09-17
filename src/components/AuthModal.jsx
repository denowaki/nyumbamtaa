import { useState } from 'react'

function AuthModal({ isOpen, onClose, onSignup, onLogin }) {
  const [tab, setTab] = useState('signup')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('tenant')
  const [password, setPassword] = useState('')

  if (!isOpen) return null

  const handleSignup = (e) => {
    e.preventDefault()
    onSignup({ name, phone, role })
    onClose()
    setName('')
    setPhone('')
    setRole('tenant')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    onLogin()
    onClose()
    setPassword('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">NyumbaMtaa</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="flex border-b border-gray-200 mb-6">
          <button
            type="button"
            onClick={() => setTab('signup')}
            className={`flex-1 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              tab === 'signup'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`flex-1 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              tab === 'login'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Log In
          </button>
        </div>

        {tab === 'signup' ? (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="signup-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="signup-phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="signup-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07XX XXX XXX"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-1">Role</legend>
              <div className="flex gap-4">
                {['tenant', 'landlord', 'agent'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value={option}
                      checked={role === option}
                      onChange={(e) => setRole(e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors"
            >
              Sign Up
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="login-phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number or Email
              </label>
              <input
                id="login-phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone or email"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors"
            >
              Log In
            </button>
          </form>
        )}

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

export default AuthModal

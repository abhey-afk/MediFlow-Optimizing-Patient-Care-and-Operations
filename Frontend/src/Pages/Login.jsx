import React, { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes only
      alert("Login functionality would connect to your API here");
    }, 1500);
  };
  
  return (
    <div className="flex w-full min-h-screen bg-gray-50" style={{paddingTop: '80px'}}>
      {/* Left side - Content (hidden on small screens) */}
      <div className="flex-1 bg-blue-500 text-white flex-col justify-center items-center p-4" style={{display: 'none'}}>
        {/* You can add a nice illustration or logo here if you want */}
      </div>
      
      {/* Right side - Form */}
      <div className="flex flex-1 justify-center items-center p-4">
        <form className="bg-white shadow-md rounded-lg p-4 w-full max-w-md" onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            <span className="text-2xl" role="img" aria-label="logo">🏥</span>
            <h1 className="text-xl font-bold text-blue-500 mb-1 mt-2">Sign in to your account</h1>
            <p className="text-gray-500 text-sm">Access your healthcare dashboard</p>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 rounded border mb-1 text-base"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 rounded border text-base"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-xs bg-transparent border-0 cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition mt-2"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
          <div className="text-center mt-4 text-sm">
            <span className="text-gray-500">Don't have an account? </span>
            <a href="/register" className="text-blue-500 hover:underline font-medium">Create Account</a>
          </div>
        </form>
      </div>
    </div>
  );
}
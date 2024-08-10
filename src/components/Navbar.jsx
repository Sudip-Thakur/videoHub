import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../constants.js';

const Navbar = ({ isLoggedIn }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setIsLoggedIn, setUser } = useAuth();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSearch = () => {
    if (searchKeyword.trim()) {
      navigate(`/search/${encodeURIComponent(searchKeyword.trim())}`);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/api/v1/users/logout`, {}, { withCredentials: true });
      setIsLoggedIn(false);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center text-white sticky top-0 z-50">
      {/* Logo */}
      <div className="text-lg font-bold cursor-pointer" onClick={handleLogoClick}>
        VideoHub
      </div>

      {/* Search Box */}
      <div className="flex">
        <input
          type="text"
          placeholder="Search"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="py-1 px-2 mr-2 rounded bg-gray-700 text-white focus:outline-none text-sm"
        />
        <button
          onClick={handleSearch}
          className="bg-gray-700 py-1 px-4 rounded text-white text-sm"
        >
          Search
        </button>
      </div>

      {/* Menu Options */}
      <div className="flex space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-white hover:bg-gray-700 px-3 py-2 rounded ${isActive ? 'underline' : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/liked"
          className={({ isActive }) =>
            `text-white hover:bg-gray-700 px-3 py-2 rounded ${isActive ? 'underline' : ''}`
          }
        >
          Liked Videos
        </NavLink>
        <NavLink
          to="/playlists"
          className={({ isActive }) =>
            `text-white hover:bg-gray-700 px-3 py-2 rounded ${isActive ? 'underline' : ''}`
          }
        >
          Playlists
        </NavLink>
        <NavLink
          to="/subscribed"
          className={({ isActive }) =>
            `text-white hover:bg-gray-700 px-3 py-2 rounded ${isActive ? 'underline' : ''}`
          }
        >
          Subscriptions
        </NavLink>
        <NavLink
          to="/watch-history"
          className={({ isActive }) =>
            `text-white hover:bg-gray-700 px-3 py-2 rounded ${isActive ? 'underline' : ''}`
          }
        >
          Watch History
        </NavLink>
      </div>

      {/* Login/Profile Section */}
      <div className="flex items-center relative">
        {isLoggedIn ? (
          <>
            <button
              onClick={() => navigate('/create')}
              className="bg-gray-700 py-1 px-4 rounded text-white text-sm mr-2"
            >
              Create
            </button>
            <div className="relative">
              <img
                src={user?.avatar || 'https://www.shutterstock.com/image-vector/default-avatar-profile-vector-user-260nw-1705357234.jpg'}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded shadow-lg">
                  <ul>
                    <li>
                      <NavLink
                        to="/mychannel"
                        className="block px-4 py-2 hover:bg-gray-700"
                        onClick={() => setDropdownOpen(false)}
                      >
                        My Channel
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/settings"
                        className="block px-4 py-2 hover:bg-gray-700"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Settings
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : (
          <button
            onClick={handleLoginClick}
            className="bg-gray-700 py-1 px-4 rounded text-white text-sm"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

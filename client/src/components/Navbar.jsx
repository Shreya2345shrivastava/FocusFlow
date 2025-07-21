import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav
        className="bg-white shadow-md p-4 flex items-center justify-between"
        style={{
          position: 'relative',
          flexWrap: 'wrap',
          padding: '1rem',
        }}
        aria-label="Main navigation"
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: '#6366f1',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: 'none',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            style={{ width: '1.5rem', height: '1.5rem' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <div className="flex items-center gap-4" style={{ position: 'absolute', top: '1rem', right: '1rem' }}> {/* Place in the top-right corner */}
          <Link
            to="/profile"
            className="text-lg font-semibold text-gray-800"
            style={{
              background: '#f3f4f6',
              color: '#374151',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            Profile
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              style={{
                background: '#ef4444',
                color: '#fff',
                fontSize: '1rem',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              style={{
                background: '#3b82f6',
                color: '#fff',
                fontSize: '1rem',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              Logout
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

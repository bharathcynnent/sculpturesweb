import React, { useState } from 'react';
import '../csscomponents/Header.css';
import logo from '..//assets/react.svg';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaLock } from 'react-icons/fa';
import keywordMap from '../utils/keywordMap';

const Header = ({ onNavigate, onCartClick, onAdminLoginSuccess }) => {
  const [flippedLink, setFlippedLink] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusField, setFocusField] = useState(null);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleClick = (label, index) => {
    setFlippedLink(index);
    if (onNavigate[label]) {
      onNavigate[label]();
    }
    setTimeout(() => setFlippedLink(null), 800);
    setNavOpen(false);
  };

  const handleLogin = () => {
    if (username === '' && password === '') {
      setLoginError('');
      setShowLogin(false);
      setUsername('');
      setPassword('');
      onAdminLoginSuccess();
    } else {
      setLoginError('Invalid username or password');
    }
  };



const handleSearch = (e) => {
  if (e.key === 'Enter' && filteredSuggestions.length > 0) {
    const { label } = filteredSuggestions[0];
    if (onNavigate[label]) {
      onNavigate[label]();
      setFlippedLink(links.indexOf(label));
    }
    setSearchTerm('');
    setShowSuggestions(false);
    setFilteredSuggestions([]);
    setTimeout(() => setFlippedLink(null), 800);
  }
};



  // Added "Work and Architecture" after "Shop"
  const links = ['Home', 'About', 'Sculptures', 'Shop', 'Work & Architecture', 'Contact'];

  return (
    <>
      <header className="header">
        <div className="header-left">
          <img src={logo} alt="Logo" className="logo" />
          <span className="hamburger" onClick={() => setNavOpen(!navOpen)}>
            <FaBars />
          </span>
        </div>

        <nav className={`nav-center ${navOpen ? 'open' : ''}`}>
          {links.map((label, index) => (
            <span
              key={label}
              className={`nav-link ${flippedLink === index ? 'flip-link' : ''}`}
              onClick={() => handleClick(label, index)}
            >
              {label}
            </span>
          ))}
        </nav>

        <div className="header-right">
          <div className="search-container">
            {showSearchInput && (
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchTerm}
onChange={(e) => {
  const value = e.target.value.toLowerCase();
  setSearchTerm(value);

  if (value.trim() === '') {
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    return;
  }

  const matches = Object.entries(keywordMap)
    .filter(([keyword]) => keyword.toLowerCase().includes(value))
    .map(([keyword, label]) => ({ keyword, label }));

  setFilteredSuggestions(matches);
  setShowSuggestions(true);
}}

                 onKeyDown={handleSearch}
                autoFocus
              />
            )}
            {showSuggestions && (
  <ul className="suggestions-dropdown">
  {filteredSuggestions.length > 0 ? (
    filteredSuggestions.map(({ keyword, label }, index) => (
      <li
        key={index}
        className="suggestion-item"
        onClick={() => {
          if (onNavigate[label]) {
            onNavigate[label]();
            setFlippedLink(links.indexOf(label));
          }
          setSearchTerm('');
          setShowSuggestions(false);
          setTimeout(() => setFlippedLink(null), 800);
        }}
      >
        {keyword}
      </li>
    ))
  ) : (
    <li className="suggestion-item no-result">No results found</li>
  )}
</ul>

)}
            <span
  className="icon"
  title="Search"
  onClick={() => {
    setShowSearchInput((prev) => {
      const newState = !prev;
      if (!newState) {
        setSearchTerm('');
        setFilteredSuggestions([]);
        setShowSuggestions(false);
      }
      return newState;
    });
  }}
>
  <FaSearch />
</span>

          </div>

          <span className="icon" title="Cart" onClick={onCartClick}>
            <FaShoppingCart />
          </span>
          <span className="icon" title="Admin" onClick={() => setShowLogin(true)}>
            <FaUser />
          </span>
        </div>
      </header>
      {showLogin && (
  <div className="login-modal">
    <div className="login-box animated-glass">
      <h2 className="login-title">Admin Login</h2>

      {/* Cartoon Face */}
      <div className={`face-box ${focusField === 'username' ? 'looking-down' : focusField === 'password' ? 'eyes-closed' : ''}`}>
  <div className="eyes"></div>
  <div className="mouth"></div>
</div>

      <div className="input-group">
        <FaUser className="input-icon" />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onFocus={() => setFocusField('username')}
          onBlur={() => setFocusField(null)}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="input-group">
        <FaLock className="input-icon" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onFocus={() => setFocusField('password')}
          onBlur={() => setFocusField(null)}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {loginError && <p className="loginerror">{loginError}</p>}

      <div className="login-actions">
        <button className="btn primary" onClick={handleLogin}>Login</button>
        <button className="btn secondary" onClick={() => setShowLogin(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default Header;




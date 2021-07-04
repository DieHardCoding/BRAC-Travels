import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import './Navbar.css';


function NavBar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => {
    setClick(!click);
  }

  const closeMobileMenu = () => {
    setClick(false);
  }

  const showButton = () => {
    if(window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);
    return () => {
      window.removeEventListener('resize', showButton);
    }
  }, []);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            TRVL <i className="fab fa-typo3">
            </i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times': 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active': 'nav-menu'}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/my-flight" className="nav-links" onClick={closeMobileMenu}>
                Chuyến bay của tôi
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavBar;

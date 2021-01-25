import React from 'react';

// import {} from '../../assets/Netflix-Logo.png'

import './styles.css';

interface OwnProps {
  blackHeader: boolean;
}

const Header = ({ blackHeader }: OwnProps) => {
  return (
    <header className={blackHeader ? 'black' : ''}>
      <div className="header--logo">
        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/375px-Netflix_2015_logo.svg.png"
            alt="Netflix-logo"
          />
        </a>
      </div>
      <div className="header--user">
        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="User-avatar"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;

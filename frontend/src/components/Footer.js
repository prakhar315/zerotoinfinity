import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} TakeYouForward - Math Learning Platform</p>
      </div>
    </footer>
  );
};

export default Footer;

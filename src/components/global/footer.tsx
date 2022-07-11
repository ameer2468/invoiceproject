import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="col">
          <h3>Payee.</h3>
          <p>Copyright @ Payee 2022.</p>
        </div>
        <div className="col">
          <div className="list">
            <h3>Resources</h3>
            <ul>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Careers</li>
            </ul>
          </div>
          <div className="list">
            <h3>Company</h3>
            <ul>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Disclaimer</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
} from "react-bootstrap-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>MiniShop-React</h3>
          <p>Your simple e-commerce app</p>
        </div>

        <div className="footer-section">
          <h4>Links</h4>
          <a href="#">Home</a>
          <a href="#">Cart</a>
          <a href="#">About</a>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@minishop.com</p>
          <p>Phone: 911</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>

          <div className="social-icons">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={20} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={20} />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>

      <p className="footer-bottom">
        © 2026 MiniShop-React. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

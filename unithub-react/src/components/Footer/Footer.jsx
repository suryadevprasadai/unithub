import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {

  return (

    <footer className="footer">

      <div className="container footer-grid">

        <div>

          <img
            src="/logo.png"
            alt="logo"
            className="footer-logo"
          />

          <h2>UnitHub</h2>

          <p>

            India's Smart Industrial Marketplace.

          </p>

        </div>

        <div>

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>

          <Link to="/companies">Companies</Link>

          <Link to="/products">Products</Link>

          <Link to="/about">About</Link>

          <Link to="/contact">Contact</Link>

        </div>

        <div>

          <h3>Support</h3>

          <a href="#">Help Center</a>

          <a href="#">Privacy Policy</a>

          <a href="#">Terms</a>

          <a href="#">Contact</a>

        </div>

      </div>

      <div className="copyright">

        © 2026 UnitHub. All Rights Reserved.

      </div>

    </footer>

  );

}

export default Footer;
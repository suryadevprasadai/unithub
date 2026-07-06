import "./CTA.css";
import { Link } from "react-router-dom";

function CTA() {

  return (

    <section className="cta">

      <div className="container">

        <h2>

          Ready to Grow Your Business?

        </h2>

        <p>

          Join thousands of verified manufacturers and connect with buyers across India.

        </p>

        <div className="cta-buttons">

          <Link
            to="/company-register"
            className="cta-register"
          >

            Register Company

          </Link>

          <Link
            to="/search"
            className="cta-search"
          >

            Explore Companies

          </Link>

        </div>

      </div>

    </section>

  );

}

export default CTA;
import "./About.css";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function About() {

  return (

    <>

      <Navbar />

      <section className="about-page">

        {/* Hero */}

        <div className="about-hero">

          <div className="about-container">

            <h1>About UnitHub</h1>

            <p>

              India's Smart Industrial Marketplace connecting manufacturers,
              suppliers and buyers on one powerful digital platform.

            </p>

          </div>

        </div>

        {/* Mission */}

        <div className="about-container">

          <section className="about-section">

            <h2>Our Mission</h2>

            <p>

              Our mission is to simplify industrial business by bringing verified
              manufacturers, suppliers, and buyers together on a single trusted
              platform. We aim to help businesses grow faster through better
              visibility, direct communication, and easy product discovery.

            </p>

          </section>

          {/* Vision */}

          <section className="about-section">

            <h2>Our Vision</h2>

            <p>

              We envision UnitHub becoming India's largest digital industrial
              ecosystem where every manufacturing company, supplier and buyer
              can connect, collaborate and expand without geographical limits.

            </p>

          </section>

          {/* Why UnitHub */}

          <section className="about-section">

            <h2>Why Choose UnitHub?</h2>

            <div className="feature-grid">

              <div className="feature-card">

                <span>🏭</span>

                <h3>Verified Companies</h3>

                <p>

                  Connect only with genuine industrial businesses.

                </p>

              </div>

              <div className="feature-card">

                <span>📦</span>

                <h3>Industrial Products</h3>

                <p>

                  Discover products from multiple industries.

                </p>

              </div>

              <div className="feature-card">

                <span>🤝</span>

                <h3>Direct Inquiry</h3>

                <p>

                  Contact manufacturers directly without middlemen.

                </p>

              </div>

              <div className="feature-card">

                <span>🚀</span>

                <h3>Business Growth</h3>

                <p>

                  Increase your online visibility and customer reach.

                </p>

              </div>

              <div className="feature-card">

                <span>🌎</span>

                <h3>PAN India Network</h3>

                <p>

                  Connect with industries across the country.

                </p>

              </div>

              <div className="feature-card">

                <span>🔒</span>

                <h3>Trusted Platform</h3>

                <p>

                  Safe, reliable and built for industrial businesses.

                </p>

              </div>

            </div>

          </section>

          {/* Journey */}

          <section className="about-section">

            <h2>Our Journey</h2>

            <div className="timeline">

              <div className="timeline-card">

                <h3>2026</h3>

                <p>

                  UnitHub was started with a vision to digitally transform the
                  Indian manufacturing ecosystem.

                </p>

              </div>

            </div>

          </section>

          {/* CTA */}

          <section className="about-cta">

            <h2>Ready to Grow Your Business?</h2>

            <p>

              Join thousands of manufacturers and suppliers building the future
              of industrial commerce.

            </p>

            <div className="cta-buttons">

              <Link
                to="/company-register"
                className="join-btn"
              >

                Join UnitHub

              </Link>

              <Link
                to="/contact"
                className="contact-btn-about"
              >

                Contact Us

              </Link>

            </div>

          </section>

        </div>

      </section>

      <Footer />

    </>

  );

}

export default About;
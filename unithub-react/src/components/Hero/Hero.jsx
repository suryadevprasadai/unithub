import "./Hero.css";
import hero from "../../assets/hero.png";

function Hero() {
  return (
    <section className="hero">

      <div className="container hero-container">

        <div className="hero-left">

          <span className="hero-tag">
            🇮🇳 India's Smart B2B Industrial Marketplace
          </span>

          <h1>

            Connect Manufacturers,

            <span> Suppliers & Buyers</span>

            <br />

            Across India

          </h1>

          <p>

            UnitHub helps manufacturers showcase their products,
            connect with verified buyers, receive inquiries,
            and grow their business with a modern digital marketplace.

          </p>

          <div className="hero-buttons">

            <button className="orange-btn">
              Explore Products
            </button>

            <button className="white-btn">
              Register Company
            </button>

          </div>

          <div className="hero-stats">

            <div>

              <h2>500+</h2>

              <span>Companies</span>

            </div>

            <div>

              <h2>2500+</h2>

              <span>Products</span>

            </div>

            <div>

              <h2>50+</h2>

              <span>Cities</span>

            </div>

          </div>

        </div>

        <div className="hero-right">

          <img src={hero} alt="Hero" />

        </div>

      </div>

    </section>
  );
}

export default Hero;
import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {

  return (

    <section className="not-found">

      <div className="not-found-box">

        <h1>404</h1>

        <h2>Oops! Page Not Found</h2>

        <p>

          The page you are looking for doesn't exist or has been moved.

        </p>

        <Link to="/" className="home-btn">

          🏠 Back to Home

        </Link>

      </div>

    </section>

  );

}

export default NotFound;
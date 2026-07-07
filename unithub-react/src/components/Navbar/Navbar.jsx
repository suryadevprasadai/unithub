import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

function Navbar() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {

    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {

      setUser(session?.user ?? null);

    });

    return () => {

      subscription.unsubscribe();

    };

  }, []);

  async function handleLogout() {

    await supabase.auth.signOut();

    navigate("/");

  }

  return (

    <nav className="navbar">

      <div className="container nav-container">

        {/* logo_url*/}

        <Link to="/" className="logo">

          <img src="/logo.png" alt="UnitHub" />

          <h2>UnitHub</h2>

        </Link>

        {/* Menu */}

        <ul className="nav-links">

          <li><Link to="/">Home</Link></li>

          <li><Link to="/products">Products</Link></li>

          <li><Link to="/companies">Companies</Link></li>

          <li><Link to="/about">About</Link></li>

          <li><Link to="/contact">Contact</Link></li>

        </ul>

        {/* Right Side */}

        <div className="nav-buttons">

          {user ? (

            <>

              <Link to="/company-dashboard" className="dashboard-btn">
                Dashboard
              </Link>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>

            </>

          ) : (

            <>

              <Link to="/login" className="login-btn">
                Login
              </Link>

              <Link to="/company-register" className="register-btn">
                company 
                Register
              </Link>

            </>

          )}

        </div>

      </div>

    </nav>

  );

}

export default Navbar;
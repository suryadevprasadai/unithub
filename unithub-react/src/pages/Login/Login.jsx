import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "../../services/supabase";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({

      email,

      password,

    });

    setLoading(false);

    if (error) {

      alert(error.message);

      return;

    }

    navigate("/company-dashboard");

  };

  return (

    <section className="login-page">

      <div className="login-box">

        <h1>Company Login</h1>

        <p>Login to your UnitHub account</p>

        <form onSubmit={handleLogin}>

          <input

            type="email"

            placeholder="Business Email"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            required

          />

          <div className="login-password-box">

            <input

              type={showPassword ? "text" : "password"}

              placeholder="Password"

              value={password}

              onChange={(e)=>setPassword(e.target.value)}

              required

            />

            <span

              onClick={()=>setShowPassword(!showPassword)}

            >

              {

                showPassword

                ?

                <FaEyeSlash/>

                :

                <FaEye/>

              }

            </span>

          </div>

          <div className="login-links">

            <Link

              to="/forgot-password"

              className="forgot-btn"

              >

              Forgot Password?

            </Link>

          </div>

          <button

            className="login-btn"

            type="submit"

          >

            {

              loading

              ?

              "Logging In..."

              :

              "Login"

            }

          </button>

        </form>

        <p className="register-link">

          Don't have an account?

          <Link to="/company-register">

            Register Company

          </Link>

        </p>

      </div>

    </section>

  );

}

export default Login;
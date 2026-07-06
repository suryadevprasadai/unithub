import "./ForgotPassword.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../services/supabase";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(e) {

    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {

      redirectTo: window.location.origin + "/reset-password",

    });

    setLoading(false);

    if (error) {

      alert(error.message);

      return;

    }

    alert("Password reset link has been sent to your email.");

  }

  return (

    <section className="forgot-page">

      <div className="forgot-box">

        <h1>Forgot Password</h1>

        <p>

          Enter your registered email.

        </p>

        <form onSubmit={handleReset}>

          <input

            type="email"

            placeholder="Business Email"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            required

          />

            <button type="submit">

                {

                loading

                ?

                "Sending..."

                :

                "Send Reset Link"

                }

            </button>

            <p className="back-login">
                Remember your password?

                <Link to="/login">
                    Login
                </Link>

            </p>

        </form>

      </div>

    </section>

  );

}

export default ForgotPassword;
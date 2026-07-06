import "./ChangePassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { supabase } from "../../services/supabase";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ChangePassword() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        if (password !== confirmPassword) {

            alert("Passwords do not match");

            return;

        }

        if (password.length < 6) {

            alert("Password must be at least 6 characters");

            return;

        }

        setLoading(true);

        const { error } = await supabase.auth.updateUser({

            password: password,

        });

        setLoading(false);

        if (error) {

            alert(error.message);

            return;

        }

        alert("Password Updated Successfully 🎉");

        navigate("/settings");

    }

    return (

        <>

            <Navbar />

            <section className="change-password">

                <div className="password-box">

                    <h1>🔒 Change Password</h1>

                    <p>Create a strong password for your account.</p>

                    <form onSubmit={handleSubmit}>

                        <div className="password-input">

                            <input

                                type={showPassword ? "text" : "password"}

                                placeholder="New Password"

                                value={password}

                                onChange={(e) => setPassword(e.target.value)}

                                required

                            />

                            <span

                                onClick={() => setShowPassword(!showPassword)}

                            >

                                {showPassword ? <FaEyeSlash /> : <FaEye />}

                            </span>

                        </div>

                        <div className="password-input">

                            <input

                                type={showConfirmPassword ? "text" : "password"}

                                placeholder="Confirm Password"

                                value={confirmPassword}

                                onChange={(e) => setConfirmPassword(e.target.value)}

                                required

                            />

                            <span

                                onClick={() =>

                                    setShowConfirmPassword(!showConfirmPassword)

                                }

                            >

                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}

                            </span>

                        </div>

                        <button type="submit">

                            {loading ? "Updating..." : "Update Password"}

                        </button>

                    </form>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default ChangePassword;
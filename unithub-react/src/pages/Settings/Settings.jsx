import "./Settings.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { supabase } from "../../services/supabase";

function Settings() {

    const navigate = useNavigate();

    async function logout() {

        await supabase.auth.signOut();

        navigate("/login");

    }

    return (

        <>

            <Navbar />

            <section className="settings">

                <div className="settings-box">

                    <h1>⚙ Account Settings</h1>

                    <p>
                        Manage your company account.
                    </p>

                    <div className="settings-list">

                        <Link
                            to="/company-profile"
                            className="setting-card"
                        >
                            <h2>🏭 Company Profile</h2>
                            <span>Edit your company details</span>
                        </Link>

                        <Link
                            to="/change-password"
                            className="setting-card"
                        >
                            <h2>🔒 Change Password</h2>
                            <span>Update your password</span>
                        </Link>

                        <button
                            className="setting-card logout-card"
                            onClick={logout}
                        >
                            <h2>🚪 Logout</h2>
                            <span>Sign out from your account</span>
                        </button>

                        <Link
                            to="/delete-account"
                            className="setting-card delete-card"
                        >
                            <h2>🗑 Delete Account</h2>
                            <span>Permanently delete company account</span>
                        </Link>

                    </div>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default Settings;
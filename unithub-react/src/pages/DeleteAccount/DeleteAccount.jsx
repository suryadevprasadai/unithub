import "./DeleteAccount.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { supabase } from "../../services/supabase";

function DeleteAccount() {

  const navigate = useNavigate();

  async function deleteAccount() {

    const confirmDelete = window.confirm(
      "⚠️ This will delete your company profile and all products. Continue?"
    );

    if (!confirmDelete) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // Delete Products
    const { error: productError } = await supabase
      .from("products")
      .delete()
      .eq("company_id", company.id)

    if (productError) {
      alert(productError.message);
      return;
    }

    // Delete Company
    const { error: companyError } = await supabase
      .from("companies")
      .delete()
      .eq("auth_id", user.id);

    if (companyError) {
      alert(companyError.message);
      return;
    }

    // Logout
    await supabase.auth.signOut();

    alert("Company deleted successfully.");

    navigate("/");
  }

  return (
    <>
      <Navbar />

      <section className="delete-account">

        <div className="delete-box">

          <h1>🗑 Delete Company Account</h1>

          <p>
            This action cannot be undone.
          </p>

          <button
            className="delete-btn"
            onClick={deleteAccount}
          >
            Delete Company
          </button>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default DeleteAccount;
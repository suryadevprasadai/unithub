import "./CompanyDashboard.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { supabase } from "../../services/supabase";

function CompanyDashboard() {

    const [companyName, setCompanyName] = useState("");
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalInquiries, setTotalInquiries] = useState(0);
    const [products, setProducts] = useState([]);
    const [company, setCompany] = useState(null);

    useEffect(() => {
    loadDashboard();
    }, []);

    async function loadDashboard() {

    const {
        data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        // Company Name

        const { data: company } = await supabase
          .from("companies")
          .select("company_name,owner_name,logo_url,id")
          .eq("auth_id", user.id)
          .single();

          if (company) {
          setCompanyName(company.company_name);

          setCompany(company);
        }

        // Products

     const { data: productData } = await supabase
        .from("products")
        .select("*")
        .eq("company_id", company.id)
        .order("created_at", { ascending: false });

        if (productData) {
            setProducts(productData);
            setTotalProducts(productData.length);
        }

          // Inquiries Count

          const { count } = await supabase
            .from("inquiries")
            .select("*", { count: "exact", head: true })
            .eq("company_id", company.id);

          setTotalInquiries(count || 0);

        }

  return (

    <>

      <Navbar />

      <section className="dashboard">

        <div className="dashboard-container">

          <div className="dashboard-header">

            {company?.logo_url&& (
              <img
                src={company.logo_url}
                alt="Logo"
                className="dashboard-logo"
              />
            )}

            <h1>{company?.company_name}</h1>

            <p>

              Welcome,

              <strong>{company?.owner_name}</strong>

            </p>

          </div>

          {/* Dashboard Cards */}

          <div className="dashboard-cards">

            <div className="card">

              <h3>Total Products</h3>

              <h2>{totalProducts}</h2>

            </div>

            <div className="card">

              <h3>Profile Views</h3>

              <h2>0</h2>

            </div>

            <div className="card">

              <h3>Inquiries</h3>

              <h2>{totalInquiries}</h2>

            </div>

            <div className="card">

              <h3>Membership</h3>

              <h2>Free</h2>

            </div>

            <div className="card">

              <h3>Profile Completion</h3>

              <h2>90%</h2>

            </div>

          </div>

          {/* Quick Actions */}

          <div className="dashboard-actions">

            <Link to="/add-product" className="action-btn">
              ➕ Add Product
            </Link>

            <Link to="/my-products" className="action-btn">
              📦 My Products
            </Link>

            <Link to="/company-profile" className="action-btn">
              🏭 Company Profile
            </Link>

            <Link
              to="/my-inquiries"
              className="action-btn"
              >
              📩 My Inquiries
            </Link>

            <Link
              to="/settings"
              className="action-btn"
              >
                ⚙ Settings
              </Link>

            <button
                className="logout-btn"
                onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/login";
              }}
              >
              🚪 Logout
            </button>

          </div>

          {/* Recent Products */}

          <div className="recent-products">

            <h2>Recent Products</h2>

            {products.length === 0 ? (

            <div className="empty-box">

            <h3>No Products Added Yet</h3>

            <p>Click on "Add Product" to start selling.</p>

            </div>

            ) : (

            <div className="product-list">

            {products.slice(0,5).map((item)=>(

            <div className="product-item" key={item.id}>

            <h3>{item.product_name}</h3>

            <p>{item.category}</p>

            <span>{item.price}</span>

            </div>

            ))}

            </div>

            )}

          </div>

        </div>

      </section>

      <Footer />

    </>

  );

}

export default CompanyDashboard;
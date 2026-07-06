import "./CompanyPublicProfile.css";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";

import { supabase } from "../../services/supabase";
import InquiryModal from "../../components/InquiryModal/InquiryModal";

function CompanyPublicProfile() {

  const [showInquiry, setShowInquiry] = useState(false);

  const { id } = useParams();

  const [company, setCompany] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompany();
  }, []);

  async function loadCompany() {

    setLoading(true);

    // Company Details
    const { data: companyData, error: companyError } = await supabase
      .from("companies")
      .select("*")
      .eq("id", id)
      .single();

    if (companyError) {
      console.log(companyError);
      setLoading(false);
      return;
    }

    setCompany(companyData);

    // Company Products
    const { data: productData } = await supabase
      .from("products")
      .select("*")
      .eq("company_id", companyData.id)
      .order("created_at", { ascending: false });

    if (productData) {
      setProducts(productData);
    }

    setLoading(false);
  }

  if (loading) {
    return <Loader />;
  }

  if (!company) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "100px" }}>
          Company Not Found
        </h2>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="public-company">

        <div className="public-company-container">
      <div className="company-header">

        <div className="company-logo-box">

        {company.logo_url? (

       <img

        src={company.logo_url}

        alt={company.company_name}

        className="company-logo"

        onError={(e)=>{
          e.target.src="/no-image.png";
        }}

       />

         ) : (

        <div className="company-placeholder">

        🏭

        </div>

        )}

      </div>

  <div className="company-details">

    <h1>{company.company_name}</h1>

    <p>

      <strong>Owner :</strong> {company.owner_name}

    </p>

    <p>

      <strong>Industry :</strong> {company.industry}

    </p>

    <p>

      <strong>GST :</strong> {company.gst || "Not Available"}

    </p>

    <p>

      <strong>Email :</strong> {company.email}

    </p>

    <p>

      <strong>Phone :</strong> {company.phone}

    </p>

    <p>

      <strong>Website :</strong>{" "}

      {company.website ? (

        <a

          href={company.website}

          target="_blank"

          rel="noreferrer"

        >

          Visit Website

        </a>

      ) : (

        "Not Available"

      )}

    </p>

    <p>

      <strong>Location :</strong>{" "}

      {company.city}, {company.state}

    </p>

    <button
      className="contact-btn"
      onClick={() => setShowInquiry(true)}
      >
      📩 Contact Company
    </button>

  </div>

</div>

<div className="company-products">

  <h2>Products by {company.company_name}</h2>

  {products.length===0 ? (

    <div className="empty-products">

      <h3>No Products Available</h3>

    </div>

  ) : (

    <div className="company-products-grid">

      {products.map((item)=>(

        <div className="company-product-card" key={item.id}>

          <img

            src={item.image || "/no-image.png"}

            alt={item.product_name}

            className="company-product-image"

            onError={(e)=>{

              e.target.src="/no-image.png";

            }}

          />

          <h3>{item.product_name}</h3>

          <p>{item.category}</p>

          <h4>₹{item.price}</h4>

          <Link

            to={`/product/${item.id}`}

            className="view-product-btn"

          >

            View Product

          </Link>

        </div>

      ))}

    </div>

  )}

</div>

</div>

</section>

{showInquiry && (

<InquiryModal

product={{
companies: company
}}

onClose={() => setShowInquiry(false)}

/>

)}

<Footer/>

</>

);

}

export default CompanyPublicProfile;
import "./CompanyProfile.css";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { supabase } from "../../services/supabase";

function CompanyProfile() {

  const [loading, setLoading] = useState(false);

  const [logoFile, setLogoFile] = useState(null);

  const [cover_urlFile, setcover_urlFile] = useState(null);

  const [logoPreview, setLogoPreview] = useState("");

  const [cover_urlPreview, setcover_urlPreview] = useState("");

  const [company, setCompany] = useState({

    company_name:"",
    owner_name:"",
    email:"",
    phone:"",
    gst:"",
    industry:"",
    website:"",
    state:"",
    city:"",
    about:"",
    logo_url:"",
    cover_url:"",

  });

  useEffect(() => {

    loadCompany();

  }, []);

  async function loadCompany() {

    const {

      data: { user },

    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase

      .from("companies")

      .select("*")

      .eq("auth_id", user.id)

      .single();

    if (error) {

      console.log(error);

      return;

    }

    setCompany(data);

    setLogoPreview(data.logo_url);

    setcover_urlPreview(data.cover_url);
  }

  const handleChange = (e) => {

    setCompany({

      ...company,

      [e.target.name]: e.target.value,

    });

  };

    const handleLogo = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handlecover_url = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setcover_urlFile(file);

    setcover_urlPreview(URL.createObjectURL(file));

  };

  async function handleSubmit(e){

    e.preventDefault();

    setLoading(true);

    let logoUrl = company.logo_url;

    let cover_url = company.cover_url;

        // Upload Logo
    if (logoFile) {

      const logoName = `${Date.now()}-logo-${logoFile.name}`;

      const { error: logoError } = await supabase.storage

        .from("company-logos")

        .upload(logoName, logoFile);

      if (logoError) {

        alert(logoError.message);

        setLoading(false);

        return;

      }

      const { data } = supabase.storage

      .from("company-logos")
      .getPublicUrl(logoName);

      logoUrl = data.publicUrl;

    }

    // Upload cover_url
    if (cover_urlFile) {

      const cover_urlName = `${Date.now()}-cover_url-${cover_urlFile.name}`;

      const { error: cover_urlError } = await supabase.storage

        .from("company-covers")

        .upload(cover_urlName, cover_urlFile);

      if (cover_urlError) {

        alert(cover_urlError.message);

        setLoading(false);

        return;

      }

      const { data } = supabase.storage

        .from("company-covers")
        .getPublicUrl(cover_urlName);

      cover_url = data.publicUrl;

    }

    // Update Company
    const { error } = await supabase

      .from("companies")

      .update({

        company_name: company.company_name,

        owner_name: company.owner_name,

        email: company.email,

        phone: company.phone,

        gst: company.gst,

        industry: company.industry,

        website: company.website,

        state: company.state,

        city: company.city,

        about: company.about,

        logo_url: logoUrl,

        cover_url: cover_url,

      })

      .eq("auth_id", (await supabase.auth.getUser()).data.user.id);

    setLoading(false);

    if (error) {

      alert(error.message);

      return;

    }

    alert("✅ Company Profile Updated Successfully");

  }

  return (

    <>

      <Navbar />

      <section className="company-profile">

        <div className="profile-box">

          <h1>Company Profile</h1>

          <form onSubmit={handleSubmit}>

            <label>Company cover_url</label>

            <input
              type="file"
              accept="image/*"
              onChange={handlecover_url}
            />

            {cover_urlPreview && (

              <img
                src={cover_urlPreview}
                alt="cover_url"
                className="cover_url-preview"
              />

            )}

            <label>Company Logo</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleLogo}
            />

            {logoPreview && (

              <img
                src={logoPreview}
                alt="Logo"
                className="logo-preview"
              />

            )}

            <input
              type="text"
              name="company_name"
              placeholder="Company Name"
              value={company.company_name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="owner_name"
              placeholder="Owner Name"
              value={company.owner_name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={company.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={company.phone}
              onChange={handleChange}
            />

            <input
              type="text"
              name="gst"
              placeholder="GST Number"
              value={company.gst}
              onChange={handleChange}
            />

            <input
              type="text"
              name="industry"
              placeholder="Industry"
              value={company.industry}
              onChange={handleChange}
            />

            <input
              type="text"
              name="website"
              placeholder="Website"
              value={company.website}
              onChange={handleChange}
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={company.state}
              onChange={handleChange}
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={company.city}
              onChange={handleChange}
            />

            <textarea
              name="about"
              placeholder="About Company"
              rows="6"
              value={company.about}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>

          </form>

        </div>

      </section>

      <Footer />

    </>

  );

}

export default CompanyProfile;
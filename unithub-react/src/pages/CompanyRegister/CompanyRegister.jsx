import "./CompanyRegister.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "../../services/supabase";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function CompanyRegister() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [logo, setLogo] = useState(null);

  const [cover, setCover] = useState(null);

  const [formData, setFormData] = useState({
    companyName: "",
    ownerName: "",
    email: "",
    phone: "",
    gst: "",
    industry: "",
    state: "",
    city: "",
    website: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {

      alert("Passwords do not match!");

      return;

    }

    try {

      setLoading(true);

      const { data, error } = await supabase.auth.signUp({

        email: formData.email,

        password: formData.password,

      });

      if (error) throw error;

      const authUser = data.user;

      console.log("Auth User:", authUser);
      
      // Upload Logo

const logoName = `${authUser.id}-${Date.now()}-${logo.name}`;

const { error: logoError } = await supabase.storage

  .from("company-logos")

  .upload(logoName, logo);

if (logoError) throw logoError;

const { data: logoData } = supabase.storage

  .from("company-logos")

  .getPublicUrl(logoName);

const logoUrl = logoData.publicUrl;


// Upload Cover

const coverName = `${authUser.id}-${Date.now()}-${cover.name}`;

const { error: coverError } = await supabase.storage

  .from("company-covers")

  .upload(coverName, cover);

if (coverError) throw coverError;

const { data: coverData } = supabase.storage

  .from("company-covers")

  .getPublicUrl(coverName);

const coverUrl = coverData.publicUrl;

     const { data: insertedCompany, error: dbError } = await supabase
.from("companies")
.insert([
{
auth_id: authUser.id,
company_name: formData.companyName,
owner_name: formData.ownerName,
email: formData.email,
phone: formData.phone,
gst: formData.gst,
industry: formData.industry,
state: formData.state,
city: formData.city,
website: formData.website,
logo_url: logoUrl,
cover_url: coverUrl,
},
])
.select();

console.log("Inserted Company =>", insertedCompany);
console.log("Database Error =>", dbError);

    if (dbError) throw dbError;

      alert("Company Registered Successfully 🎉");

      navigate("/login");

    }

    catch(error){

console.error(error);

alert(JSON.stringify(error,null,2));

}

    finally {

      setLoading(false);

    }

  };

  return (

    <>

      <Navbar />

      <section className="company-register">

        <div className="company-register-box">

          <h1>Register Company</h1>

          <p>Create your business account on UnitHub</p>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="ownerName"
              placeholder="Owner Name"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Business Email"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="gst"
              placeholder="GST Number"
              onChange={handleChange}
            />

            <input
              type="text"
              name="industry"
              placeholder="Industry"
              onChange={handleChange}
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={handleChange}
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
            />

            <input
              type="text"
              name="website"
              placeholder="Website"
              onChange={handleChange}
            />

            <div className="file-upload">

              <input
              id="logo"
              type="file"
              accept="image/*"
              hidden
              onChange={(e)=>setLogo(e.target.files[0])}
              />

              <label htmlFor="logo" className="custom-file">

              {logo ? logo.name : "Choose Company Logo"}

              </label>

            </div>

            <div className="file-upload">

                  <input
                  id="cover"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e)=>setCover(e.target.files[0])}
                  />

                  <label htmlFor="cover" className="custom-file">

                  {cover ? cover.name : "Choose Company Cover"}

              </label>

            </div>

              <div className="company-password-box">

              <input

                type={showPassword ? "text" : "password"}

                name="password"

                placeholder="Password"

                onChange={handleChange}

                required

              />

              <span onClick={() => setShowPassword(!showPassword)}>

                {

                  showPassword

                    ?

                    <FaEyeSlash />

                    :

                    <FaEye />

                }

              </span>

            </div>

            <div className="company-password-box">

              <input

                type={showConfirmPassword ? "text" : "password"}

                name="confirmPassword"

                placeholder="Confirm Password"

                onChange={handleChange}

                required

              />

              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>

                {

                  showConfirmPassword

                    ?

                    <FaEyeSlash />

                    :

                    <FaEye />

                }

              </span>

            </div>

            {
              formData.confirmPassword && (

              <p
              className={
              formData.password===formData.confirmPassword
              ?
              "password-success"
              :
              "password-error"
              }
              >

              {
              formData.password===formData.confirmPassword
              ?
              "✓ Passwords Match"
              :
              "✗ Passwords do not match"
              }

              </p>

              )
            }

            <button type="submit">

              {

                loading

                  ?

                  "Registering..."

                  :

                  "Register Company"

              }

            </button>

          </form>

          <p className="login-link">

            Already have an account?

            <Link to="/login">

              Login

            </Link>

          </p>

        </div>

      </section>

      <Footer />

    </>

  );

}

export default CompanyRegister;
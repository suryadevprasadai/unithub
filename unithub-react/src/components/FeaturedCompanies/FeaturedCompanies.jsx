import "./FeaturedCompanies.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../Loader/Loader";
import { supabase } from "../../services/supabase";

function FeaturedCompanies() {

  const [companies,setCompanies]=useState([]);

  const [loading,setLoading]=useState(true);

  useEffect(()=>{

  loadCompanies();

  },[]);

  async function loadCompanies(){

  setLoading(true);

  const {data,error}=await supabase

  .from("companies")

  .select("*")

  .order("created_at",{ascending:false})

  .limit(6);

  if(!error){

  setCompanies(data);

  }

  setLoading(false);

  }
  if(loading){

    return <Loader/>;

  }

  return (

    <section className="featured-companies">

      <div className="container">

        <div className="section-title">

          <h2>Featured Companies</h2>

          <p>

            Trusted Manufacturers across India

          </p>

        </div>

        <div className="company-grid">

          {companies.map((company)=>(

            <div className="company-card" key={company.id}>

              <img
                src={company.cover_url || "/default-cover.jpg"}
                className="company-cover"
                alt={company.company_name}
              />

              <img
                src={company.logo_url || "/company-logo.png"}
                className="company-logo"
                alt={company.company_name}
              />
              
              <div className="company-info">

                <h3>{company.company_name}</h3>

                <span>{company.industry}</span>

                <p>{company.city}, {company.state}</p>

              <Link

                to={`/company/${company.id}`}

                className="company-btn"

                >

                View Profile

              </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}

export default FeaturedCompanies;

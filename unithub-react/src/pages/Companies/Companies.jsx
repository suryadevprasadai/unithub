import "./Companies.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";

import { supabase } from "../../services/supabase";

function Companies(){

const [companies,setCompanies]=useState([]);

const [loading,setLoading]=useState(true);

const [search,setSearch]=useState("");

useEffect(()=>{

loadCompanies();

},[]);

async function loadCompanies(){

setLoading(true);

const {data,error}=await supabase

.from("companies")

.select("*")

.order("company_name",{ascending:true});

if(!error){

setCompanies(data);

}

setLoading(false);

}

const filteredCompanies=companies.filter((company)=>

company.company_name

.toLowerCase()

.includes(search.toLowerCase())

);

if(loading){

return <Loader/>;

}

return(

<>

<Navbar/>

<section className="companies-page">

<div className="companies-container">

<div className="companies-header">

<h1>Verified Companies</h1>

<p>

Discover trusted industrial manufacturers across India.

</p>

</div>

<input

type="text"

className="company-search"

placeholder="🔍 Search Company"

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

<div className="companies-grid">
    {filteredCompanies.length === 0 ? (

    <div className="empty-companies">

        <h2>No Companies Found</h2>

        <p>Try searching with another company name.</p>

    </div>

) : (

    filteredCompanies.map((company)=>(

        <div className="company-card" key={company.id}>

            <div className="company-logo">

                {company.logo_url? (

                    <img
                        src={company.logo_url}
                        alt={company.company_name}
                        onError={(e)=>{
                            e.target.style.display="none";
                            e.target.parentElement.innerHTML='<div class="logo-placeholder">{company.company_name.charAt(0)}</div>';
                        }}
                    />

                ) : (

                    <div className="logo-placeholder">

                        {company.company_name.charAt(0)}

                    </div>

                )}

            </div>

            <div className="company-info">

                <h2>{company.company_name}</h2>

                <p>

                    <strong>Owner :</strong> {company.owner_name}

                </p>

                <p>

                    <strong>Industry :</strong> {company.industry}

                </p>

                <p>

                    <strong>Location :</strong>{" "}

                    {company.city}, {company.state}

                </p>

                <p>

                    <strong>Email :</strong> {company.email}

                </p>

                <Link

                    to={`/company/${company.id}`}

                    className="view-company-btn"

                >

                    View Company

                </Link>

            </div>

        </div>

    ))

)}

</div>

</div>

</section>

<Footer/>

</>

);

}

export default Companies;
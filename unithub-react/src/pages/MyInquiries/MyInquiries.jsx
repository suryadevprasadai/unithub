import "./MyInquiries.css";

import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";

import { supabase } from "../../services/supabase";

function MyInquiries(){

const [loading,setLoading]=useState(true);

const [inquiries,setInquiries]=useState([]);

useEffect(()=>{

loadInquiries();

},[]);

async function loadInquiries(){

setLoading(true);

const {

data:{user}

}=await supabase.auth.getUser();

if(!user){

setLoading(false);

return;

}
const { data: company, error: companyError } = await supabase
  .from("companies")
  .select("id")
  .eq("auth_id", user.id)
  .single();

if (companyError || !company) {
  console.log(companyError);
  setLoading(false);
  return;
}

const {data,error}=await supabase

.from("inquiries")

.select(`
*,
products(
product_name
)
`)

.eq("company_id", company.id)

.order("created_at",{ascending:false});

if(!error){

setInquiries(data);

}

setLoading(false);

}

if(loading){

return <Loader/>;

}

return(

<>

<Navbar/>

<section className="inquiries-page">

<div className="inquiries-container">

<h1>My Inquiries</h1>

<p>

Manage customer inquiries received for your products.

</p>

<div className="inquiry-list">{inquiries.length===0 ? (

<div className="empty-inquiries">

<h2>No Inquiries Yet</h2>

<p>

When buyers contact you, their inquiries will appear here.

</p>

</div>

) : (

inquiries.map((item)=>(

<div className="inquiry-card" key={item.id}>

<div className="inquiry-header">

<h2>{item.buyer_name}</h2>

<span>

{new Date(item.created_at).toLocaleDateString()}

</span>

</div>

<p>

<strong>📦 Product :</strong>

{" "}

{item.products?.product_name}

</p>

<p>

<strong>📧 Email :</strong>

{" "}

<a href={`mailto:${item.buyer_email}`}>

{item.buyer_email}

</a>

</p>

<p>

<strong>📞 Phone :</strong>

{" "}

<a href={`tel:${item.buyer_phone}`}>

{item.buyer_phone}

</a>

</p>

<div className="message-box">

<h3>Message</h3>

<p>

{item.message}

</p>

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

export default MyInquiries;
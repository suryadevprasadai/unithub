import "./ProductDetails.css";
import InquiryModal from "../../components/InquiryModal/InquiryModal";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";

import { supabase } from "../../services/supabase";

function ProductDetails(){

const [showInquiry,setShowInquiry]=useState(false);

const {id}=useParams();

const [product,setProduct]=useState(null);

const [loading,setLoading]=useState(true);

useEffect(()=>{

loadProduct();

},[]);

async function loadProduct() {

  setLoading(true);

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      companies (
        id,
        company_name,
        owner_name,
        email,
        phone,
        website,
        state,
        city
      )
    `)
    .eq("id", id)
    .single();

  console.log("Product Data:", data);
  console.log("Error:", error);

  if (!error) {
    setProduct(data);
  }

  setLoading(false);

}

if(loading){

return <Loader/>;

}

if(!product){

return(

<>

<Navbar/>

<h2 style={{textAlign:"center",marginTop:"100px"}}>

Product Not Found

</h2>

<Footer/>

</>

);

}

return(

<>

<Navbar/>

<section className="product-details">

<div className="details-container"><div className="product-image-box">

  <img

    src={product.image || "/no-image.png"}

    alt={product.product_name}

    className="details-image"

    onError={(e)=>{
      e.target.src="/no-image.png";
    }}

  />

</div>

<div className="product-content">

  <h1>{product.product_name}</h1>

  <p className="product-category">

    {product.category}

  </p>

  <h2 className="product-price">

    ₹{product.price}

  </h2>

  <p className="product-moq">

    Minimum Order : {product.minimum_order}

  </p>

  <div className="description-box">

    <h3>Description</h3>

    <p>

      {product.description || "No Description Available."}

    </p>

  </div>

  <div className="company-box">

    <h3>Company Information</h3>

    <p>

      <strong>🏭 Company :</strong>

      {product.companies?.company_name}

    </p>

    <p>

      <strong>👤 Owner :</strong>

      {product.companies?.owner_name}

    </p>

    <p>

      <strong>📞 Phone :</strong>

      {product.companies?.phone}

    </p>

    <p>

        <strong>🌐 Website :</strong>{" "}

        {product.companies?.website ? (

        <a

        href={product.companies.website}

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

      <strong>📍 Location :</strong>

      {product.companies?.city},{" "}

      {product.companies?.state}

    </p>

  </div>

    <button

     className="contact-btn"

     onClick={()=>setShowInquiry(true)}

        >

     📩 Contact Company

    </button>

</div>

</div>

</section>

{showInquiry && (

<InquiryModal

product={product}

onClose={()=>setShowInquiry(false)}

/>

)}

<Footer/>

</>

);

}

export default ProductDetails;
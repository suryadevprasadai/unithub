import "./Search.css";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";

import { supabase } from "../../services/supabase";

function Search(){

const [searchParams] = useSearchParams();

const query = searchParams.get("query") || "";

const navigate = useNavigate();

const [searchText, setSearchText] = useState(query);

const [loading,setLoading]=useState(true);

const [products,setProducts]=useState([]);

const [companies,setCompanies]=useState([]);

useEffect(()=>{

searchData();

},[query]);

async function searchData() {

  setLoading(true);

  // Products Search
 const { data: productData, error: productError } = await supabase
  .from("products")
  .select("*");

console.log("Products:", productData);
console.log("Error:", productError);

  // Companies Search
  const { data: companyData } = await supabase
    .from("companies")
    .select("*");

  const keyword = query.toLowerCase();

  const filteredProducts = (productData || []).filter(item =>
    (item.product_name || "").toLowerCase().includes(keyword) ||
    (item.category || "").toLowerCase().includes(keyword) ||
    (item.companies?.company_name || "").toLowerCase().includes(keyword) ||
    (item.companies?.city || "").toLowerCase().includes(keyword) ||
    (item.companies?.state || "").toLowerCase().includes(keyword)
  );

  const filteredCompanies = (companyData || []).filter(item =>
    (item.company_name || "").toLowerCase().includes(keyword) ||
    (item.city || "").toLowerCase().includes(keyword) ||
    (item.state || "").toLowerCase().includes(keyword) ||
    (item.industry || "").toLowerCase().includes(keyword)
  );

  setProducts(filteredProducts);

  setCompanies(filteredCompanies);

  setLoading(false);

}

if(loading){

return <Loader/>;

}

return(

<>

<Navbar/>

<section className="search-page">

<div className="container">

  <div className="sticky-search">
  <div className="search-bar-top">

<input
type="text"
placeholder="Search products or companies..."
value={searchText}
onChange={(e)=>setSearchText(e.target.value)}
onKeyDown={(e)=>{

if(e.key==="Enter"){

navigate(`/search?query=${encodeURIComponent(searchText)}`);

}

}}
/>

<button
onClick={()=>navigate(`/search?query=${encodeURIComponent(searchText)}`)}
>

Search

</button>
</div>

</div>

    <h2>Products ({products.length})</h2>

<div className="search-products">
  

{

products.map(product => (
   <div
      key={product.id}
      className="search-card"
   >

<img
src={product.image || "/no-image.png"}
alt={product.product_name}
/>

<div className="search-card-body">

<h3>{product.product_name}</h3>

<p>{product.category}</p>

<p className="company-name">

🏭 {product.companies?.company_name}

</p>

<h4>₹{product.price}</h4>

<Link
to={`/product/${product.id}`}
className="view-btn"
>

View Product

</Link>

</div>

</div>

))

}

</div>

<h2>Companies ({companies.length})</h2>

<div className="search-companies">

{

companies.map(company => (
   <div
      key={company.id}
      className="company-search-card"
   >

<img
src={company.logo_url || "/company-logo.png"}
alt={company.company_name}
/>

<div className="company-card-body">

<h3>{company.company_name}</h3>

<p>

📍 {company.city}, {company.state}

</p>

<p>

🏭 {company.industry}

</p>

<Link
to={`/company/${company.id}`}
className="company-btn"
>

View Company

</Link>

</div>

</div>

))

}

</div>

<h1 className="search-title">

Search Results

</h1>

<p className="search-query">

Showing results for

<strong> "{query}" </strong>

</p>

</div>

</section>

<Footer/>

</>

);

}

export default Search;
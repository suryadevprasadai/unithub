import "./Products.css";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import SearchBar from "../../components/SearchBar/SearchBar";

import { supabase } from "../../services/supabase";
function Products() {

const [searchParams] = useSearchParams();

const search = searchParams.get("search") || "";

const [products,setProducts]=useState([]);

const [loading,setLoading]=useState(true);

useEffect(()=>{

loadProducts();

},[search]);

async function loadProducts(){

setLoading(true);

const { data, error } = await supabase

.from("products")

.select(`
*,
companies(
company_name,
state,
city
)
`)

.order("created_at",{ascending:false});

if(!error){

let filtered = data;

if (search) {

const keyword = search.toLowerCase();

filtered = data.filter(item =>

(item.product_name || "").toLowerCase().includes(keyword) ||

(item.category || "").toLowerCase().includes(keyword) ||

(item.companies?.company_name || "").toLowerCase().includes(keyword) ||

(item.companies?.city || "").toLowerCase().includes(keyword) ||

(item.companies?.state || "").toLowerCase().includes(keyword)

);

}

setProducts(filtered);

}

setLoading(false);

}

if(loading){

return <Loader/>;

}

return(

<>

<Navbar/>

<section className="products-page">

<div className="products-container">

<div className="products-header">

    
<h1>Industrial Products</h1>

<p>

Discover quality products from verified manufacturers.

</p>

{search && (

<div className="search-result">

<h3>

Showing results for :

<span>"{search}"</span>

</h3>

<p>

Found {products.length} product(s)

</p>

</div>

)}

</div>

<SearchBar compact={true} />

<div className="products-grid">
    
   {products.length===0?(

<div className="empty-products">

<h2>

No Products Found

</h2>

<p>

Try another keyword.

</p>

<Link

to="/products"

className="back-btn"

>

View All Products

</Link>

</div>

):(

    products.map((item) => (

        <div className="product-card" key={item.id}>

            <img
                src={item.image || "/no-image.png"}
                alt={item.product_name}
                className="product-image"
                onError={(e)=>{
                    e.target.src="/no-image.png";
                }}
            />

            <div className="product-info">

                <h3>{item.product_name}</h3>

                <p className="category">
                    {item.category}
                </p>

                <p className="company">

                    🏭 {item.companies?.company_name}

                </p>

                <h4>

                    ₹{item.price}

                </h4>

                <span>

                    MOQ : {item.minimum_order}

                </span>

                <Link

                    to={`/product/${item.id}`}

                    className="view-btn"

                >

                    View Details

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

export default Products;
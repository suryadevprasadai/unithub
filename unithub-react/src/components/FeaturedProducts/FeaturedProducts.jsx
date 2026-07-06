import "./FeaturedProducts.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../Loader/Loader";
import { supabase } from "../../services/supabase";

function FeaturedProducts(){

const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {

    loadProducts();

}, []);

async function loadProducts(){

    setLoading(true);
const { data, error } = await supabase
  .from("products")
  .select("*")
  .order("created_at", { ascending: false })
  .limit(6);

console.log(data);
console.log(error);

if (!error) {
  setProducts(data);
}

    setLoading(false);

}
if(loading){

    return <Loader/>;

}

return(

<section className="featured-products">

<div className="container">

<div className="section-heading">

<h2>

Featured Products

</h2>

<p>

High Quality Industrial Products

</p>

</div>

<div className="product-grid">

{

products.map((product)=>(

<div
className="product-card"
key={product.id}
>

<img

src={product.image || "/no-image.png"}

alt={product.product_name}

onError={(e)=>{

e.target.src="/no-image.png";

}}

/>

<div className="product-info">

<h3>

{product.product_name}

</h3>

<p>{product.category}</p>

<h4>

₹{product.price}

</h4>

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

</div>

</section>

);

}

export default FeaturedProducts;
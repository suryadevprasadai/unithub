import "./SearchBar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar({ compact = false }) {

const navigate = useNavigate();

const [search,setSearch] = useState("");

function handleSearch(){

if(search.trim()==="") return;

navigate(`/search?query=${encodeURIComponent(search)}`);

}

return(

<section className={compact ? "search-section compact-search" : "search-section"}>

<div className="container">

<h2>Find Manufacturers & Products</h2>

<p>Search verified industrial suppliers across India.</p>

<div className="search-box">

<input

type="text"

placeholder="Search Product..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

onKeyDown={(e)=>{

if(e.key==="Enter"){

handleSearch();

}

}}

/>

<button

type="button"

onClick={handleSearch}

>

Search

</button>

</div>

</div>

</section>

);

}

export default SearchBar;
import "./Stats.css";

const stats = [

  {
    number: "1250+",
    title: "Verified Companies",
    icon: "🏭",
  },

  {
    number: "8500+",
    title: "Products Listed",
    icon: "📦",
  },

  {
    number: "35000+",
    title: "Business Connections",
    icon: "🤝",
  },

  {
    number: "28",
    title: "States Covered",
    icon: "🌍",
  },

];

function Stats(){

return(

<section className="stats">

<div className="container">

<div className="stats-grid">

{

stats.map((item,index)=>(

<div className="stat-card" key={index}>

<div className="stat-icon">

{item.icon}

</div>

<h2>

{item.number}

</h2>

<p>

{item.title}

</p>

</div>

))

}

</div>

</div>

</section>

);

}

export default Stats;
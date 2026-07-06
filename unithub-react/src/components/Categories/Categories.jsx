import "./Categories.css";

const categories = [
  {
    title: "Steel",
    image: "/assets/steel.jpg",
  },
  {
    title: "Machinery",
    image: "/assets/machinery.jpg",
  },
  {
    title: "Electrical",
    image: "/assets/electrical.jpg",
  },
  {
    title: "Plastic",
    image: "/assets/plastic.jpg",
  },
  {
    title: "Textile",
    image: "/assets/textile.jpg",
  },
];

function Categories() {
  return (
    <section className="categories">

      <div className="container">

        <h2>Browse Industries</h2>

        <p>
          Explore manufacturing sectors across India
        </p>

        <div className="category-grid">

          {categories.map((item, index) => (

            <div className="category-card" key={index}>

              <img src={item.image} alt={item.title} />

              <h3>{item.title}</h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Categories;
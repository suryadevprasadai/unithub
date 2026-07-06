import "./Testimonials.css";

const testimonials = [

  {
    name: "Rajesh Kumar",
    company: "ABC Steel Industries",
    review:
      "UnitHub helped us connect with genuine buyers and expand our business across multiple states.",
    image: "/users/user1.jpg",
  },

  {
    name: "Pooja Sharma",
    company: "Future Machines",
    review:
      "Professional platform with quality industrial leads. Highly recommended for manufacturers.",
    image: "/users/user2.jpg",
  },

  {
    name: "Amit Verma",
    company: "PowerTech Electricals",
    review:
      "Very clean interface and easy to connect with verified companies.",
    image: "/users/user3.jpg",
  },

];

function Testimonials() {

  return (

    <section className="testimonials">

      <div className="container">

        <div className="section-heading">

          <h2>What Our Partners Say</h2>

          <p>

            Trusted by manufacturers across India.

          </p>

        </div>

        <div className="testimonial-grid">

          {

            testimonials.map((item,index)=>(

              <div className="testimonial-card" key={index}>

                <img
                  src={item.image}
                  alt=""
                />

                <h3>{item.name}</h3>

                <span>{item.company}</span>

                <p>

                  "{item.review}"

                </p>

              </div>

            ))

          }

        </div>

      </div>

    </section>

  );

}

export default Testimonials;
import "./WhyChoose.css";

const features = [

  {
    icon: "🏭",
    title: "Verified Manufacturers",
    description:
      "Every listed company is verified to build trust and ensure genuine business connections.",
  },

  {
    icon: "🤝",
    title: "Direct B2B Connections",
    description:
      "Connect directly with manufacturers and suppliers without unnecessary middlemen.",
  },

  {
    icon: "📦",
    title: "Industrial Products",
    description:
      "Explore thousands of industrial products from trusted companies across India.",
  },

  {
    icon: "⚡",
    title: "Fast Business Growth",
    description:
      "Expand your network, generate quality leads, and grow your business faster.",
  },

];

function WhyChoose() {

  return (

    <section className="why-section">

      <div className="container">

        <div className="section-heading">

          <h2>Why Choose UnitHub?</h2>

          <p>

            Everything your manufacturing business needs in one platform.

          </p>

        </div>

        <div className="why-grid">

          {

            features.map((item,index)=>(

              <div
                className="why-card"
                key={index}
              >

                <div className="why-icon">

                  {item.icon}

                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

              </div>

            ))

          }

        </div>

      </div>

    </section>

  );

}

export default WhyChoose;
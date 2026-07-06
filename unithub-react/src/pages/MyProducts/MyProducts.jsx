import "./MyProducts.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { supabase } from "../../services/supabase";

function MyProducts() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadProducts();

  }, []);

async function loadProducts() {

  setLoading(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setLoading(false);
    return;
  }

  // Logged in user ki company nikalo
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

  // Company ke products lao
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("company_id", company.id)
    .order("created_at", { ascending: false });

  if (!error) {
    setProducts(data);
  } else {
    console.log(error);
  }

  setLoading(false);
}

  async function deleteProduct(id) {

    const confirmDelete = window.confirm(

      "Are you sure you want to delete this product?"

    );

    if (!confirmDelete) return;

    await supabase

      .from("products")

      .delete()

      .eq("id", id);

    loadProducts();

  }
    return (

    <>

      <Navbar />

      <section className="my-products">

        <div className="container">

          <div className="top-bar">

            <h1>My Products</h1>

            <Link
              to="/add-product"
              className="add-product-btn"
            >
              + Add Product
            </Link>

          </div>

          {loading ? (

            <div className="empty-box">

              <h2>Loading...</h2>

            </div>

          ) : products.length === 0 ? (

            <div className="empty-box">

              <h2>No Products Found</h2>

              <p>

                Start by adding your first product.

              </p>

              <Link
                to="/add-product"
                className="add-product-btn"
              >
                Add Product
              </Link>

            </div>

          ) : (

            <div className="product-grid">

              {products.map((item) => (

                <div
                  className="product-card"
                  key={item.id}
                >

                  <img
                    src={
                      item.image ||
                      "https://via.placeholder.com/300x220?text=No+Image"
                    }
                    alt={item.product_name}
                  />

                  <div className="product-info">

                    <h3>{item.product_name}</h3>

                    <p>{item.category}</p>

                    <h4>₹ {item.price}</h4>

                    <span>

                      MOQ : {item.minimum_order}

                    </span>

                  </div>

                  <div className="product-actions">

                    <Link
                      to={`/edit-product/${item.id}`}
                      className="edit-btn"
                    >

                      ✏ Edit

                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteProduct(item.id)
                      }
                    >

                      🗑 Delete

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

      <Footer />

    </>

  );

}

export default MyProducts;
import "./AddProduct.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { supabase } from "../../services/supabase";

function AddProduct() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFile] = useState(null);

  const [preview, setPreview] = useState("");

  const [product, setProduct] = useState({
    product_name: "",
    category: "",
    description: "",
    price: "",
    minimum_order: "",
  });

  const handleChange = (e) => {

    setProduct({

      ...product,

      [e.target.name]: e.target.value,

    });

  };

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);

    setPreview(URL.createObjectURL(file));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first.");
        setLoading(false);
        return;
      }

      let imageUrl = "";

      // Upload Image

      if (imageFile) {

        const fileName = `${Date.now()}-${imageFile.name}`;

        const { error: uploadError } = await supabase.storage

          .from("products")

          .upload(fileName, imageFile);

        if (uploadError) {

          alert(uploadError.message);

          setLoading(false);

          return;

        }

        const { data } = supabase.storage

          .from("products")

          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;

      }

      // Save Product

      const { error } = await supabase

        .from("products")

        .insert([

          {

            company_id: company.id,

            product_name: product.product_name,

            category: product.category,

            description: product.description,

            price: product.price,

            minimum_order: product.minimum_order,

            image: imageUrl,

          },

        ]);

      if (error) {

        alert(error.message);

        setLoading(false);

        return;

      }

      alert("✅ Product Added Successfully");

      navigate("/company-dashboard");

    } catch (err) {

      console.log(err);

      alert("Something went wrong.");

    }

    setLoading(false);

};
  return (

    <>

      <Navbar />

      <section className="add-product">

        <div className="product-box">

          <h1>Add New Product</h1>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="product_name"
              placeholder="Product Name"
              value={product.product_name}
              onChange={handleChange}
              required
            />

            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >

              <option value="">Select Category</option>

              <option value="Steel">Steel</option>

              <option value="Machinery">Machinery</option>

              <option value="Electrical">Electrical</option>

              <option value="Plastic">Plastic</option>

              <option value="Textile">Textile</option>

              <option value="Automation">Automation</option>

              <option value="Packaging">Packaging</option>

            </select>

            <textarea
              name="description"
              placeholder="Product Description"
              value={product.description}
              onChange={handleChange}
              rows="5"
            />

            <input
              type="text"
              name="price"
              placeholder="Price (₹)"
              value={product.price}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="minimum_order"
              placeholder="Minimum Order Quantity"
              value={product.minimum_order}
              onChange={handleChange}
            />

            <label className="upload-label">

              Product Image

            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />

            {preview && (

              <img
                src={preview}
                alt="Preview"
                className="preview-image"
              />

            )}

            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >

              {loading ? "Uploading..." : "Add Product"}

            </button>

          </form>

        </div>

      </section>

      <Footer />

    </>

  );

}

export default AddProduct;
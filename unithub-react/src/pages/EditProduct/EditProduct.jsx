import "./EditProduct.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { supabase } from "../../services/supabase";

function EditProduct() {

  const { id } = useParams();

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
    image: "",
  });

  useEffect(() => {

    loadProduct();

  }, []);

  async function loadProduct() {

    const { data, error } = await supabase

      .from("products")

      .select("*")

      .eq("id", id)

      .single();

    if (error) {

      console.log(error);

      return;

    }

    setProduct(data);

    setPreview(data.image);

  }

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

    let imageUrl = product.image;
        // Agar nayi image select ki hai to upload karo
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

    // Database Update
    const { error } = await supabase

      .from("products")

      .update({

        product_name: product.product_name,

        category: product.category,

        description: product.description,

        price: product.price,

        minimum_order: product.minimum_order,

        image: imageUrl,

      })

      .eq("id", id);

    setLoading(false);

    if (error) {

      alert(error.message);

      return;

    }

    alert("✅ Product Updated Successfully");

    navigate("/my-products");

  };

  return (

    <>

      <Navbar />

      <section className="add-product">

        <div className="product-box">

          <h1>Edit Product</h1>

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
              rows="5"
              value={product.description}
              onChange={handleChange}
            />

            <input
              type="text"
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
            />

            <input
              type="number"
              name="minimum_order"
              placeholder="Minimum Order"
              value={product.minimum_order}
              onChange={handleChange}
            />

            <label className="upload-label">

              Current Image

            </label>

            {preview && (

              <img
                src={preview}
                alt="Preview"
                className="preview-image"
              />

            )}

            <input

              type="file"

              accept="image/*"

              onChange={handleImage}

            />

            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >

              {loading ? "Updating..." : "Save Changes"}

            </button>

          </form>

        </div>

      </section>

      <Footer />

    </>

  );

}

export default EditProduct;
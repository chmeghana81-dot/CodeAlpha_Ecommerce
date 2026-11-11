import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(`products/${id}/`);
        setProduct(response.data);
        setQuantity(1);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
          "Unable to load product details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setAdding(true);
      setMessage("");

      await API.post("cart/", {
        product: product.id,
        quantity: quantity,
      });

      setMessage("Product added to your cart successfully!");
    } catch (err) {
      if (err.response?.status === 401) {
        setMessage("Your session has expired. Please log in again.");
        return;
      }

      setMessage(
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Unable to add this product. Please try again."
      );
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <Loader />;

  if (error) {
    return <div className="pd-message">{error}</div>;
  }

  if (!product) {
    return <div className="pd-message">Product not found.</div>;
  }

  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `http://127.0.0.1:8000${product.image}`
    : "";

  const price = Number(product.price || 0);
  const stock = Number(product.stock || 0);

  return (
    <main className="pd-page">
      <div className="pd-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <section className="pd-layout">
        <div className="pd-gallery">
          <div className="pd-image-card">
            {imageUrl ? (
              <img src={imageUrl} alt={product.name} />
            ) : (
              <div className="pd-placeholder">✦</div>
            )}
            <span className="pd-image-label">PRODUCT DETAILS</span>
          </div>
        </div>

        <div className="pd-info">
          <span className="pd-eyebrow">
            {product.category_name || "COLLECTION"}
          </span>

          <h1>{product.name}</h1>

          <div className="pd-rating">
            <span>★★★★★</span>
            <small>Premium selection</small>
          </div>

          <div className="pd-price">
            ₹{price.toLocaleString("en-IN")}
            <span>INCLUSIVE OF ALL TAXES</span>
          </div>

          <div className="pd-divider" />

          <h3>Product description</h3>
          <p className="pd-description">
            {product.description ||
              "Discover quality, style and everyday comfort with this carefully selected product."}
          </p>

          <div className="pd-stock">
            <span className={
              stock > 0
                ? "pd-stock-dot available"
                : "pd-stock-dot unavailable"
            } />
            {stock > 0
              ? `${stock} items available`
              : "Currently out of stock"}
          </div>

          {stock > 0 && (
            <>
              <div className="pd-quantity">
                <span>QUANTITY</span>
                <div className="pd-quantity-control">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>

                  <strong>{quantity}</strong>

                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.min(stock, q + 1))}
                    disabled={quantity >= stock}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="pd-cart-button"
                onClick={handleAddToCart}
                disabled={adding}
              >
                <span>{adding ? "ADDING..." : "ADD TO CART"}</span>
                <span>→</span>
              </button>
            </>
          )}

          {message && (
            <p role="status" style={{ marginTop: "12px" }}>
              {message}
            </p>
          )}

          <div className="pd-benefits">
            <div>
              <span className="pd-benefit-icon">◇</span>
              <p>
                <strong>Quality assured</strong>
                <small>Carefully selected products</small>
              </p>
            </div>
            <div>
              <span className="pd-benefit-icon">↗</span>
              <p>
                <strong>Secure shopping</strong>
                <small>Safe and easy checkout</small>
              </p>
            </div>
            <div>
              <span className="pd-benefit-icon">♡</span>
              <p>
                <strong>Customer care</strong>
                <small>We're here to help</small>
              </p>
            </div>
          </div>

          <Link to="/cart" className="pd-back-link">
            VIEW MY CART →
          </Link>
          <br />
          <Link to="/products" className="pd-back-link">
            ← CONTINUE SHOPPING
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;

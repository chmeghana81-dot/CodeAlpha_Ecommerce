import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link
        to={`/products/${product.id}`}
        className="product-image"
        aria-label={`View ${product.name}`}
      >
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" />
        ) : (
          <div className="product-placeholder">
            <span>{"\u{1F6CD}\uFE0F"}</span>
            <small>Image coming soon</small>
          </div>
        )}
        <span className="product-category-badge">
          {product.category_name || "Collection"}
        </span>
      </Link>

      <div className="product-info">
        <p className="product-category">
          MEGASTORE COLLECTION
        </p>

        <h3>{product.name}</h3>

        <div className="product-bottom">
          <span className="product-price">
            {"\u20B9"}{Number(product.price).toLocaleString("en-IN")}
          </span>

          <Link
            to={`/products/${product.id}`}
            className="view-product-btn"
          >
            View Details <span aria-hidden="true">{"\u2192"}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

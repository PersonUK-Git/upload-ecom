import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio, Spin } from "antd"; // Import Spin for loading indicator
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "./../components/Layout/Layout";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage] = useState(2); // Items per page
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for error handling

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://node-server-s44q.onrender.com/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch products with pagination
  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://node-server-s44q.onrender.com/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data?.products || []);
      setTotal(data?.total || 0); // Total count for pagination
    } catch (error) {
      setLoading(false);
      setError("Error fetching products."); // Set error message
      console.error("Error fetching products:", error);
    }
  };

  // Initial fetch of categories and products
  useEffect(() => {
    getAllCategory();
    getProducts();
  }, [page]);

  // Handle filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Fetch filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "https://node-server-s44q.onrender.com/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products || []);
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  };

  // Filter dependencies
  useEffect(() => {
    if (!checked.length && !radio.length) {
      getProducts();
    } else {
      filterProduct();
    }
  }, [checked, radio]);

  // Pagination handlers
  const handleNext = () => {
    if (page < Math.ceil(total / perPage)) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <Layout title={"All Products - Best offers"}>
      {/* Banner image */}
      <img
        src="/images/banner.png "
        className="banner-img"
        alt="banner"
        width={"100%"}
      />

      <div className="container-fluid row mt-3 home-page">
        {/* Filters Section */}
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p, index) => (
                <div key={index}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        {/* Products Section */}
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          {loading ? (
            <div className="text-center">
              <Spin size="large" />
            </div>
          ) : error ? (
            <div className="text-center text-danger">{error}</div>
          ) : (
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" key={p._id || p.slug}>
                  <img
                    src={`https://node-server-s44q.onrender.com/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                    </div>
                    <p className="card-text">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-dark ms-1"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item Added to cart");
                        }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="pagination-controls text-center mt-4">
            <button
              className="btn btn-primary m-2"
              onClick={handlePrevious}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {Math.ceil(total / perPage)}
            </span>
            <button
              className="btn btn-primary m-2"
              onClick={handleNext}
              disabled={page === Math.ceil(total / perPage)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

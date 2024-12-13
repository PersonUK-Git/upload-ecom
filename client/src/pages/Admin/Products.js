import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./style.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(null);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggingIndex === null) return;

    const newProducts = [...products];
    const [removed] = newProducts.splice(draggingIndex, 1);
    newProducts.splice(index, 0, removed);

    // Update the order field in the products array
    newProducts.forEach((product, i) => {
      product.order = i + 1;
    });

    setProducts(newProducts);
    setDraggingIndex(null);

    // Make API call to update the product order
    axios
      .post(
        "https://node-server-s44q.onrender.com/api/v1/product/update-product-order",
        {
          products: newProducts,
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap grid-container">
            {products?.map((p, index) => (
              <div
                key={p._id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                className="product-link m-2 grid-item"
              >
                <Link to={`/dashboard/admin/product/${p.slug}`}>
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;

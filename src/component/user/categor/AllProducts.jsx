import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, Outlet } from "react-router-dom";
import ProductPage from "./ProductPage";
import Rating from "./Rating";
export default function AllProducts() {
  const [page, setPage] = useState(1);
  const [ddata, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const [ppage, setPpage] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // const { data, isLoading } = useQuery("getAllProducts", getAllProducts);
  const getPage = (pageId) => {
    setIsLoading(true);

    setPage(pageId);

    getAllProducts(pageId);
    //setIsLoading(false);
  };
  const nextPage = () => {
    setIsLoading(true);
    const limit = total / ppage;
    if (page != limit) {
      getPage(page + 1);
    } else {
      getPage(page);
    }
    //setIsLoading(false);
  };
  const previPage = () => {
    setIsLoading(true);
    if (page != 1) {
      getPage(page - 1);
    } else {
      getPage(1);
    }
    //setIsLoading(false);
  };
  const getAllProducts = async (page) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products?page=${page}`
    );
    setData(data.products);
    console.log(data.products)
    setTotal(data.total);
    setPpage(data.page);
    setIsLoading(false);
  };
  useEffect(() => {
    setIsLoading(true);
    getAllProducts(1);
  }, []);

  if (isLoading) {
    return <p>loogfiing</p>;
  }
  return (
    <div className="container">
      <div className="productInbage">
        <div className="row ">
          {ddata ? (
            ddata.map((product, index) => (
              <div className="col-lg-3 mt-4 ">
                <div className="productInfoAll d-flex flex-column mt-5">
                <img src={product.mainImage.secure_url} alt="" className="mt-5"/>

                    <h1>{product.name}</h1>
                    <h2> {product.finalPrice}$</h2>
                    <div className="rating my-0">
                    <Rating RatingNumb={product.ratingNumbers}/>

                    </div>
                    <Link to={`/product/${product._id}`}>Detalis</Link>

                </div>
              </div>
            ))
          ) : (
            <h2>Np Product</h2>
          )}
        </div>
      </div>

      <div className="pagination d-flex justify-content-center mt-3 text-dark">
        <nav aria-label="Page navigation example">
          <ul className="pagination ">
            <li className="page-item ">
              <a className="page-link" href="#" onClick={previPage}>
                Previous
              </a>
            </li>
            {Array.from({ length: total / ppage }).map((_, index) => (
              <li
                className={`page-item ${page == index ? "active" : ""}`}
                key={index}
              >
                <li class="page-item">
                  <a
                    class="page-link"
                    href="#"
                    onClick={() => getPage(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              </li>
            ))}

            <li className="page-item">
              <a className="page-link" href="#" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

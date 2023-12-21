import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, Outlet } from "react-router-dom";
import ProductPage from "./ProductPage";
import Rating from "./Rating";
import ReactSlider from "react-slider";
import Slider from "react-slider";
export default function AllProducts() {
  const [page, setPage] = useState(1);
  const [ddata, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const [ppage, setPpage] = useState([]);
  const [isSort, setIsSort] = useState(false);
  let [min, setMin] = useState(0);
  let [max, setMax] = useState(500);
  let [sort, setSort] = useState("");
  let [limit, setLimit] = useState("");
  let [search, setSearch] = useState("");
  let [showLimit, setShowLimit] = useState(false);
  let [showRange, setShowRange] = useState(false);
  let [showSortP, setShowSortP] = useState(false);
  let [showSortN, setShowSortN] = useState(false);
  const getSortN = () => {
    setShowSortN(!showSortN);
  };
  const getSortP = () => {
    setShowSortP(!showSortP);
  };

  const getShowRange = () => {
    setShowRange(!showRange);
  };
  const getShowLimit = () => {
    setShowLimit(!showLimit);
  };
  const [isLoading, setIsLoading] = useState(false);

  const getPage = (pageId) => {
    setIsLoading(true);

    setPage(pageId);

    getAllProducts(pageId, min, max, sort, limit, search);
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
  const getAllProducts = async (page, min, max, sort, limit, search) => {
    console.log(search);
    setSort(sort);
    setLimit(limit);
    setSearch(search);
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/products?page=${page}&limit=${limit}&price[gte]=${min}&price[lte]=${max}&sort=${sort}&search=${search}&fields=name,mainImage,finalPrice,discount`
    );
    setData(data.products);
    setTotal(data.total);
    setPpage(data.page);
    setIsLoading(false);
  };
  const sorted = () => {
    setIsSort(true);
  };
  const canceled = () => {
    setIsSort(false);
  };
  const limitValue = (e) => {
    // limit=e.target.value;
    getAllProducts(page, min, max, "", e.target.value, search);
  };
  const changeSearch = (e) => {
    getAllProducts(page, min, max, "", limit, e.target.value);
  };
  useEffect(() => {
    setIsLoading(true);
    getAllProducts(1, min, max, sort, limit, search);
  }, []);

  if (isLoading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  return (
    <aside className="Profile row mx-5">
      {!isSort ? (
        <div className="d-flex justify-content-around">
          {" "}
          <input
            type="text"
            placeholder="Search"
            className="search"
            onChange={changeSearch}
            name="search"
          />
          <button className="sorted" onClick={sorted}>
            Product classification
          </button>
        </div>
      ) : (
        ""
      )}

      {isSort ? (
        <div className="profileLink col-lg-2 ">
          <nav className="sideSort ">
            <button className="canceled" onClick={canceled}>
              <img src="error.png" alt="" />
            </button>
            <div className="mx-3 all mt-3">
              <Link to="" className="mt-0 ">
                <div className="d-flex borderNav limitNon"                     onClick={getShowLimit}
>
                  <p className="mt-1 peiceRange text-lg-start ms-2 my-2">
                    Display{" "}
                  </p>
                  <img
                    src="show.png"
                    className="showw"
                    alt=""
                  />
                </div>
                {showLimit ? (
                  <div className="d-flex  limitNon">
                    <p className="mt-1 ms-2 mb-1 peiceRange s16 my-2 limitNon">
                      Limit :
                    </p>
                    <input
                      type="text"
                      className="limit mb-0"
                      name="limit"
                      onChange={limitValue}
                    />
                  </div>
                ) : (
                  ""
                )}
              </Link>
              <div className="d-flex borderNav my-2 "                   onClick={getShowRange}
>
                <p className="mt-1 peiceRange text-lg-start ms-2 my-2 w-100">
                  Price Range :
                </p>
                <img
                  src="show.png"
                  className="showw"
                  alt=""
                />
              </div>
              {showRange ? (
                <>
                  {" "}
                  <div className="d-flex">
                    <p className="mt-1 ms-2 mb-1 peiceRange s16">Min</p>
                    <input
                      type="text"
                      className="limit mb-0 "
                      value={min}
                      name="limit"
                      onChange={limitValue}
                    />
                    <p className="mt-1 ms-2 mb-1 peiceRange s16">-</p>

                    <p className="mt-1 ms-2 mb-1 peiceRange s16">Max</p>
                    <input
                      type="text"
                      className="limit mb-0"
                      value={max}
                      name="limit"
                      onChange={limitValue}
                    />
                  </div>
                  <Link to="" className="mt-0">
                    {" "}
                    <ReactSlider
                      className="horizontal-slider mt-0"
                      thumbClassName="example-thumb"
                      trackClassName="example-track"
                      min={0}
                      max={500}
                      defaultValue={[0, 500]}
                      ariaLabel={["Lower thumb", "Upper thumb"]}
                      ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                      renderThumb={(props, state) => (
                        <div {...props}>{state.valueNow}</div>
                      )}
                      pearling
                      onChange={([min, max]) => {
                        setMin(min);
                        setMax(max);
                        getAllProducts(page, min, max, sort, limit, search);
                      }}
                    />
                  </Link>
                </>
              ) : (
                ""
              )}

              <Link to="" className="mt-1"                     onClick={getSortP}
>
                <div className="d-flex borderNav">
                  <p className="mt-3 peiceRange text-lg-start ms-2">
                    Sort products by price
                  </p>
                  <img
                    src="show.png"
                    className="showw"
                    alt=""
                  />
                </div>
                {showSortP ? (
                  <>
                    {" "}
                    <button
                      className="sort"
                      onClick={() =>
                        getAllProducts(page, min, max, "-price", limit, search)
                      }
                    >
                      From highest price to lowest price
                    </button>
                    <button
                      className="sort"
                      onClick={() =>
                        getAllProducts(page, min, max, "price", limit, search)
                      }
                    >
                      From lowest price to highest price
                    </button>
                  </>
                ) : (
                  ""
                )}
              </Link>
              <Link to="" className="mt-1">
                <div className="d-flex borderNav my-2"                     onClick={getSortN}
>
                  <p className="mt-3 peiceRange text-lg-start ms-2">
                    Sort Products By Name
                  </p>
                  <img
                    src="show.png"
                    className="showw"
                    alt=""
                  />
                </div>

                {showSortN ? (
                  <>
                    {" "}
                    <button
                      className="sort text-lg-start w-100 ms-2"
                      onClick={() =>
                        getAllProducts(page, min, max, "name", limit, search)
                      }
                    >
                      From A To Z Name
                    </button>
                    <button
                      className="sort text-lg-start w-100 ms-2"
                      onClick={() =>
                        getAllProducts(page, min, max, "-name", limit, search)
                      }
                    >
                      From Z To A Name
                    </button>
                  </>
                ) : (
                  ""
                )}
              </Link>
            </div>
          </nav>
        </div>
      ) : (
        ""
      )}

      <div className={`UserData col-lg-${isSort ? "9" : "12"}`}>
        <div className="productInbage">
          <div className="row ">
            {ddata.length ? (
              ddata.map((product, index) => (
                <div className="col-lg-3 mt-1 ">
                  <div className="productInfoAll d-flex flex-column mt-5 pb-5">
                    <img
                      src={product.mainImage.secure_url}
                      alt=""
                      className="mt-3"
                    />

                    <h1>{product.name}</h1>
                    {product.discount ? (
                      <h2>
                        <s className="text-danger">{product.finalPrice} $</s>{" "}
                        {product.finalPrice -
                          product.finalPrice * (product.discount / 100)}
                        $
                      </h2>
                    ) : (
                      <h2> {product.finalPrice}$</h2>
                    )}
                    <div className="rating my-0">
                      {console.log(product.avgRating)}
                      <Rating RatingNumb={product.avgRating} />
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

              {ddata.length ? (
                Array.from({ length: total / ppage }).map((_, index) => (
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
                ))
              ) : (
                <li class="page-item">
                  <a class="page-link" href="#">
                    1
                  </a>
                </li>
              )}

              <li className="page-item">
                <a className="page-link" href="#" onClick={nextPage}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>{" "}
      </div>
    </aside>
  );
}

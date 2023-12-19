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
const [isSort,setIsSort]=useState(false);
  let [min, setMin] = useState(0);
  let [max, setMax] = useState(500);
  let [sort,setSort]=useState("");
  let [limit,setLimit]=useState("");
//let limit ="";
  const [isLoading, setIsLoading] = useState(false);

  const getPage = (pageId) => {
    setIsLoading(true);

    setPage(pageId);

    getAllProducts(pageId, min, max,sort,limit);
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
  const getAllProducts = async (page, min, max,sort,limit) => {
    setSort(sort);
    setLimit(limit)
    console.log(limit)

    const { data } = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/products?page=${page}&limit=${limit}&price[gte]=${min}&price[lte]=${max}&sort=${sort}`
    );
    setData(data.products);
    setTotal(data.total);
    setPpage(data.page);
    setIsLoading(false);
  };
  const sorted =()=>{
    setIsSort(true)
  }
  const canceled=()=>{
    setIsSort(false)

  }
  const limitValue=(e)=>{
   // limit=e.target.value;
    getAllProducts(page, min, max,"",e.target.value)
  }
  useEffect(() => {
    setIsLoading(true);
    getAllProducts(1, min, max,sort,limit);
  }, []);

  if (isLoading) {
    return <p>loogfiing</p>;
  }
  return (
    <aside className="Profile row ">
      {!isSort?     <div className="d-flex justify-content-end"> <button className="sorted" onClick={sorted}>Product classification</button></div>:""
}

      {isSort? <div className="profileLink col-lg-2 ">
        <nav className="sideSort">
          <button className="canceled" onClick={canceled}><img src="error.png" alt="" /></button>

          <Link to="" className="mt-0">
          <p className="mt-1 peiceRange text-lg-start ms-2">Display :</p>

        <div className="d-flex">
        <p className="mt-1 ms-2 mb-1 peiceRange s16">Limit :</p>
        <input type="text" className="limit mb-0"  name="limit" onChange={limitValue}/>

        </div>
          </Link>
          <p className="mt-1 peiceRange text-lg-start ms-2  w-100">Price Range :</p>
          <div className="d-flex">
        <p className="mt-1 ms-2 mb-1 peiceRange s16">Min</p>
        <input type="text" className="limit mb-0 " value={min}  name="limit" onChange={limitValue}/>
        <p className="mt-1 ms-2 mb-1 peiceRange s16">-</p>

        <p className="mt-1 ms-2 mb-1 peiceRange s16">Max</p>
        <input type="text" className="limit mb-0" value={max}  name="limit" onChange={limitValue}/>
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
                getAllProducts(page, min, max,sort,limit);
              }}
            />
          </Link>


          <Link to="" className='mt-1'> 
          <p className="mt-3 peiceRange text-lg-start ms-2">Sort products by price</p>
          <button className="sort" onClick={()=>getAllProducts(page, min, max,"-price",limit)}>From highest price to lowest price</button>
          <button className="sort"onClick={()=>getAllProducts(page, min, max,"price",limit)}>From lowest price to highest price</button>



          </Link>
          <Link to="" className='mt-1'> 
          <p className="mt-3 peiceRange text-lg-start ms-2">Sort Products By Name</p>
          <button className="sort text-lg-start w-100 ms-2" onClick={()=>getAllProducts(page, min, max,"-name",limit)}>From A To Z Name</button>
          <button className="sort text-lg-start w-100 ms-2"onClick={()=>getAllProducts(page, min, max,"name",limit)}>From Z To A Name</button>



          </Link>

        </nav>
      </div>:""}
     
      <div className={`UserData col-lg-${isSort?"9":"12"}`}>
        <div className="productInbage">
          <div className="row ">
            {ddata.length ? (
              ddata.map((product, index) => (
                <div className="col-lg-3 mt-1 ">
                  <div className="productInfoAll d-flex flex-column mt-5">
                    <img
                      src={product.mainImage.secure_url}
                      alt=""
                      className="mt-5"
                    />

                    <h1>{product.name}</h1>
                    <h2> {product.finalPrice}$</h2>
                    <div className="rating my-0">
                      <Rating RatingNumb={product.ratingNumbers} />
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

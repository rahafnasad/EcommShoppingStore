
import axios from 'axios';

import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery} from 'react-query';

export default function CategoryDetails() {
    const {categoryId}=useParams();
const getCategory = async()=>{
    const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);

    return data.products;
}
const {data,isLoading}=useQuery('categoryDetails',getCategory);
if(isLoading){
  return <div className="spinner-border" role="status">
  <span className="sr-only">Loading...</span>
</div>
}
  return (
<>
<div className="products Container ">
    <div className="titelee d-flex justify-content-center ">
      <div >

      <span className='text-uppercase border-bottom pe-2 pb-1'>category</span>
      <p>We have the best materials and products</p>

      </div>

    </div>
    <div className="row my-5 mx-3">
       
    {data.length? data.map((product)=>
    <div className=" col-lg-4 text-center " key={product._id}>
      <div className="product">
      <img src={product.mainImage.secure_url } alt="" />
        <h2> {product.name}</h2>
        <Link to={`/product/${product._id}`}>Detalis</Link>

      </div>

    </div>
    
    ):
    <h2>no product</h2>


    }
    </div>


</div>
</>

    )
}

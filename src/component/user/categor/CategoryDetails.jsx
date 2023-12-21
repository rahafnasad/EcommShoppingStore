
import axios from 'axios';

import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery} from 'react-query';
import Rating from './Rating';

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
<div className="products Container mb-0">

    <div className="titelee d-flex justify-content-center ">
      <div >
      <span  data-text="category">category</span>
     

      </div>

    </div>
    <div className="row mb-5 mx-5 mt-0 ">
       
    {data.length? data.map((product)=>
    <div className=" col-lg-3 text-center " key={product._id}>
      <div className="productInfoAll d-flex flex-column mt-5 ">
      <img src={product.mainImage.secure_url } alt="" className='mt-3'/>
        <h1 className='mx-2'> {product.name}</h1>
        <div className="ratingCat d-flex justify-content-center">
        <Rating RatingNumb={product.ratingNumbers}/>

        </div>

        <Link to={`/product/${product._id}`} className='productDet'>Detalis</Link>

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

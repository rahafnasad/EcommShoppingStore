import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery} from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar ,Autoplay } from 'swiper/modules';

import './categ.css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';
import { Link } from 'react-router-dom';


export default function Categories() {
  const getCategories=async()=>{
      const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=7`);
   
      return data;
    }
const {data,isLoading}=useQuery('web_categories',getCategories);
if(isLoading){
  return <div className="spinner-border" role="status">
  <span className="sr-only">Loading...</span>
</div>
}
  return (
  <>
  
 <div className="Container">
<div className="catrg">
<div className="titelee d-flex justify-content-center ">
      <div >

      <span className='text-uppercase border-bottom pe-2 pb-1'>categories</span>
      <p>We have the best materials and products</p>

      </div>

    </div>
 <Swiper
       modules={[Navigation, Pagination,Autoplay ]}

      spaceBetween={50}
      slidesPerView={6.5}
      navigation


      pagination={{ clickable: true,
      el:'.swiper-sustom' }}
      loop={true}
      autoplay={{delay:1500}}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data?.categories.length?data?.categories.map((category)=>


      <SwiperSlide key={category._id}>
        <Link to={`/products/category/${category._id}`}>
        <img src={category.image.secure_url}/>
        </Link>
        </SwiperSlide>):
      <h2>categories not found</h2>  }
   
    </Swiper>
    <div className="swiper-sustom"></div>
</div>

 </div>
  </>
  )
}

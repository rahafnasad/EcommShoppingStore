import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import './profile.css'
import { CartContext } from '../contex/Cart';

export default function Profile() {
    const {getProfileInfoContect}=useContext(CartContext);

    const {data,isLoading}=useQuery('profileInfo',getProfileInfoContect);

    console.log(useQuery('profileInfo',getProfileInfoContect));
    if(isLoading){
        return <div className="spinner-border" role="status">
    <span className="sr-only">Loading...</span>
      </div>
      }
  return (
<div className="container ">
<div className="profile-info row">
<div className="col-lg-7 d-flex justify-content-center align-items-center">
<div className="profileName ">
            <span className='me-4' >Name : </span><p>{data.userName}</p>
        </div>
        <div className="profileEmail">
            <span  className='me-4'>Email : </span><p>{data.email}</p>

        </div>
</div>
     <div className="col-lg-5">
     <div className="profilePhoto my-4">
                <img src={data.image.secure_url} alt="" />
        </div>
     </div>
      
    </div>
</div>
    )
}

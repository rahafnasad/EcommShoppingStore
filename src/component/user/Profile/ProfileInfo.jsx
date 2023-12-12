import React, { useContext } from 'react'
import { UserContext } from '../contex/User';

export default function ProfileInfo() {
    let { userData ,loader } = useContext(UserContext);
    if(loader){
      
      return <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    
    }
  return (
   <div className="info">
    <h3> Name : {userData.userName}</h3>
    <img src={userData.image.secure_url} alt="" />
   </div>
  )
}

import React, { useContext } from 'react'
import { UserContext } from '../contex/User';

export default function ProfileContact() {
  let { userData ,loader } = useContext(UserContext);
  if(loader){
    
    return <div className="spinner-border" role="status">
    <span className="sr-only">Loading...</span>
  </div>
  
  }
  return (
<div className="contact">

  <h3>Email : {userData.email}</h3>
</div>
    )
}

import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery} from 'react-query';
import ReactImageMagnify from 'react-image-magnify';
import { CartContext } from '../contex/Cart';
import { UserContext } from '../contex/User';


export default function Product() {
    let {userToken}=useContext(UserContext);

    const {AddToCartContext} = useContext(CartContext);
    const {productId}= useParams();

    const getProduct = async ()=> {
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);

        return data.product;
    } 
    const {data,isLoading}=useQuery('productt',getProduct);
    const AddToCart=async(productId)=>{
        const res = await AddToCartContext(productId);


    }
    if(isLoading){
        return <div className="spinner-border" role="status">
    <span className="sr-only">Loading...</span>
      </div>
      }
  return (
    <>
<div className="container">
    <div className="row">
        <div className="col-lg-4"> 
        {
            data.subImages.map((image)=>
            <div className="image mt-3" key={image._id}>           
            
            
            <ReactImageMagnify {...{
    smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src: image.secure_url
    },
    largeImage: {
        src: image.secure_url,
        width: 2200,
        height: 1800
    },
    isHintEnabled:true,
}} />
            
            
            </div>

            )


        }
        
        </div>
        <div className="col-lg-8 detalis">
            <h1><span>Name : </span> {data.name}</h1>
            <h2> <span> price : </span>{data.finalPrice}</h2>
            <p><span>description : </span>{data.description}</p>
            {userToken&&            <button onClick={()=>AddToCart(data._id)}>Add To Cart</button>
}
        </div>
    </div>
</div>

   
  </>
  )
}

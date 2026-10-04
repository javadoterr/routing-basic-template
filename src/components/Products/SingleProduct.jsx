import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const SingleProduct = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const handleBack = () =>{
    //navigate(-1);
    navigate('/products');
  };
  return (
    <div>
        <h2>Single Product : {id}</h2>
        <button onClick={handleBack}>Go Back</button>
    </div>
  )
}

export default SingleProduct;
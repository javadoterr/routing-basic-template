import React from 'react'
import '../Common/Loader.css';

const Loader = () => {
  return (
    <div>
        <div className="lds-ripple">
            <div></div>
            <div></div>
        </div>
    </div>
  )
}

export default Loader;
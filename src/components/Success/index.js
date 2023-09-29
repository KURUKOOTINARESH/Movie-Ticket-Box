import React from 'react'
import "./index.css"
import success from "../../assets/success.png"
import qr from "../../assets/qr.png"

const Success = () => {
  return (
    <div className='success-page'>
        <div className='left-section'>
            <div><img src={success} alt="success" className='success-img'/></div>
            <div>
            <h4>Tickets Confirmed</h4>
            <h5>Enjoy your movie</h5>
            </div>
            
        </div>
        <div className='right-section'>
            <div><img src={qr} alt="qr" className='success-img'/></div>
        </div>
    </div>
  )
}

export default Success
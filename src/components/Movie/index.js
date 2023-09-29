import React, { useState,useEffect } from 'react'
import "./index.css"
import { useLocation,useNavigate } from 'react-router-dom'
import "./index.css"
import axios from 'axios'
import {Button} from "react-bootstrap"

const Movie = () => {
  const image_url = 'https://image.tmdb.org/t/p/w500'
  const location = useLocation()
  const {title,overView,poster_path} = location.state
  const navigate = useNavigate()

  const [latLng,setLatLng] = useState({})
  const [theatres,setTheatres] = useState([])
  const timings = ['10:00 AM','3:00 PM','6:00 PM','9:00 PM']

  useEffect(()=>{
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position)=>{
        setLatLng({
          lat : position.coords.latitude,
          lng: position.coords.longitude
        })
      })
    }
  },[])


  useEffect(()=>{
    if(Object.keys(latLng).length >0){
      const geoApi = 'https://api.geoapify.com/v2/places?categories=entertainment.cinema&filter=circle:80.3204306,17.5895257,5000&bias=proximity:80.3204306,17.5895257&limit=20&apiKey=d866737148a9498684c10c719d52f814'
      axios.get(geoApi).then(res=>{
        const featuresArr = res.data.features;
        const names = []
        featuresArr.map(feature=>names.push(feature.properties.name))
        console.log(names)
        setTheatres(names)
      })
    }
    
  },[latLng])

  
  return (
    <div className='movie-page'>
      <div className='movie-details-con'>
        <img src={image_url+poster_path} alt={title} className='movie-page-img'/>
        <h3>{title}</h3>
        <p>{overView}</p>
      </div>
      <div className='theatres-con'>
        {
          theatres.map((theatre,index)=>{
            return(
              <div key={theatre+index} style={{marginBottom:"1rem"}}>
                <p style={{fontWeight:"bold"}}>{theatre}</p>
                {timings.map(time=><Button key={time} onClick={()=>{
                  navigate("/select",{state:{title:title}})
                }} style={{marginRight:"0.8rem"}}>{time}</Button>)}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Movie
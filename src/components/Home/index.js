import React, { useState,useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import "./index.css"
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const Home = () => {
  const navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem("userTB"))
  let isUserLoggedin = false
  if(userData){
    isUserLoggedin = userData.isLoggedin
  }

  const [movies,setMovies] = useState([])
  const image_url = 'https://image.tmdb.org/t/p/w500'

  useEffect(()=>{
    

    const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=335914e07c0d26bd15668ad334889c0e&language=en-US&page=1';

    axios.get(url)
      .then(res => setMovies(res.data.results))
      .catch(err => console.error('error:' + err));
  },[])
  if(!isUserLoggedin){
    return <Navigate to="/login"/>
  }
  return (
    <div className='home-page'>
      <ul className='movies-list'>
      {movies.map(movie=>{
        return(
          <li key={movie.id} className='movie-card' onClick={()=>navigate(`/movie/${movie.id}`,{state:{title:movie.title,overView:movie.overview,poster_path:movie.poster_path}})}>
            <div className='shadow-bg'></div> 
            <img src={image_url + movie.poster_path} alt={movie.title} className='movie-img'/>
            <h3>{movie.title}</h3>
          </li>
        )
      })}
      </ul>
    </div>
  )
}

export default Home